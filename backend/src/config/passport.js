const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        // Criar novo usuário via Google
        const nome = profile.displayName;
        const telefone = '';
        const dataNascimento = new Date(2000, 0, 1);
        const senhaHash = await bcrypt.hash(Math.random().toString(36), 10);

        user = await prisma.user.create({
          data: {
            nome,
            email,
            senha: senhaHash,
            telefone,
            dataNascimento,
            status: 'Ativo',
            isAdmin: false
          }
        });
      }

      if (user.status !== 'Ativo') {
        return done(null, false, { message: 'Usuário inativo' });
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;