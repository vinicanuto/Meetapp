import { isBefore, parseISO } from 'date-fns';
import * as Yup from 'yup';
import Meetup from '../models/Meetup';

class MeetupController {
  async delete(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findOne({ where: { user_id: req.userId, id } });

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't delete past meetups" });
    }

    await meetup.destroy();

    return res.send();
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const meetup = await Meetup.findOne({
      where: { user_id: req.userId, id },
    });

    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found' });
    }

    const { title, description, date, location } = await meetup.update(
      req.body
    );

    return res.json({
      id,
      title,
      description,
      date,
      location,
    });
  }

  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
      order: ['date'],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { title, description, location, date } = req.body;

    const parsedDate = parseISO(date);

    if (isBefore(parsedDate, new Date())) {
      return res.status(401).json({ error: 'Past time are not permitted' });
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date: parsedDate,
      user_id: req.userId,
    });

    return res.json(meetup);
  }
}

export default new MeetupController();
