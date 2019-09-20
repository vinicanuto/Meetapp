import Mail from '../../lib/Mail';

class SubscriptionMail {
  // Para cada job precisamos de uma chave única
  get key() {
    return 'SubscriptionMail';
  }

  // Todas as informações são passadas dentro do data
  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: `Novo Inscrito no meetup ${meetup.title}`,
      template: 'subscription',
      context: {
        organizer: meetup.User.name,
        meetup: meetup.title,
        user: user.name,
        email: user.email,
      },
    });
  }
}

export default new SubscriptionMail();
