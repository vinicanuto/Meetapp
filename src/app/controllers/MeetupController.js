import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const { title, description, location } = req.body;
    return res.json({});
  }
}

export default new MeetupController();
