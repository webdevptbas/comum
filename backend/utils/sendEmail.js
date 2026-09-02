const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

exports.sendVerificationEmail = async (to, name, token) => {
  const verifyUrl = `${process.env.FRONTEND_ORIGIN}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Comum Space" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verifikasi Email Akun Comum Space Anda",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Halo, ${name}!</h2>
        <p>Terima kasih sudah mendaftar di Comum Space. Silakan verifikasi email kamu dengan klik tombol di bawah ini:</p>
        <a href="${verifyUrl}"
          style="display:inline-block; padding:12px 24px; background-color:#3267e3; color:#ffffff; text-decoration:none; border-radius:4px; margin: 16px 0;">
          Verifikasi Email
        </a>
        <p>Atau salin link berikut ke browser kamu:</p>
        <p>${verifyUrl}</p>
        <p>Link ini akan kedaluwarsa dalam 24 jam.</p>
        <p>Kalau kamu tidak merasa mendaftar di Comum Space, abaikan saja email ini.</p>
      </div>
    `,
  });
};
