// src/utils/sendEmail.js
import emailjs from "@emailjs/browser";

const sendEmailToAbsentees = async (absentees) => {
  for (const student of absentees) {
    const templateParams = {
      name: student.name,
      email: student.email,
      course: student.course,
      year: student.year,
      date: new Date().toLocaleDateString(),
      message: student.aiMessage || `Dear ${student.name}, you were marked Absent in today's class. Please contact the class coordinator.`,
    };

    try {
      await emailjs.send(
        "service_u6iwbp5",      // ✅ Service ID
        "template_dzasl59",     // ✅ Template ID
        templateParams,
        "5FlCfbyVDTxDTAmrC"     // ✅ Public Key
      );
      console.log(`✅ Email sent to ${student.email}`);
    } catch (error) {
      console.error(`❌ Failed to send email to ${student.email}`, error);
    }
  }
};

export default sendEmailToAbsentees;
