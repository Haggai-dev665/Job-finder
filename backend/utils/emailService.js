const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  // Send generic email
  async sendEmail(options) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.email,
        subject: options.subject,
        html: options.html,
        text: options.text
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }

  // Send welcome email
  async sendWelcomeEmail(user) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Job Finder!</h2>
        <p>Hi ${user.firstName},</p>
        <p>Thank you for joining Job Finder. We're excited to help you in your job search journey.</p>
        <p>You can now:</p>
        <ul>
          <li>Browse thousands of job opportunities</li>
          <li>Save jobs for later</li>
          <li>Apply to jobs directly</li>
          <li>Follow your favorite companies</li>
          <li>Get personalized job recommendations</li>
        </ul>
        <p>Get started by completing your profile and uploading your resume.</p>
        <p>
          <a href="${process.env.CLIENT_URL}/profile" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Complete Your Profile
          </a>
        </p>
        <p>Best regards,<br>The Job Finder Team</p>
      </div>
    `;

    return this.sendEmail({
      email: user.email,
      subject: 'Welcome to Job Finder!',
      html
    });
  }

  // Send email verification
  async sendEmailVerification(user, token) {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Verify Your Email</h2>
        <p>Hi ${user.firstName},</p>
        <p>Please verify your email address by clicking the link below:</p>
        <p>
          <a href="${verificationUrl}" 
             style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Verify Email Address
          </a>
        </p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <p>Best regards,<br>The Job Finder Team</p>
      </div>
    `;

    return this.sendEmail({
      email: user.email,
      subject: 'Verify Your Email Address',
      html
    });
  }

  // Send password reset email
  async sendPasswordResetEmail(user, token) {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Reset Your Password</h2>
        <p>Hi ${user.firstName},</p>
        <p>You requested to reset your password. Click the link below to create a new password:</p>
        <p>
          <a href="${resetUrl}" 
             style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </p>
        <p>This link will expire in 10 minutes.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>Best regards,<br>The Job Finder Team</p>
      </div>
    `;

    return this.sendEmail({
      email: user.email,
      subject: 'Reset Your Password',
      html
    });
  }

  // Send job application notification to employer
  async sendJobApplicationNotification(employer, job, applicant) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Job Application</h2>
        <p>Hi ${employer.firstName},</p>
        <p>You have received a new application for your job posting:</p>
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3 style="margin-top: 0;">${job.title}</h3>
          <p><strong>Applicant:</strong> ${applicant.firstName} ${applicant.lastName}</p>
          <p><strong>Email:</strong> ${applicant.email}</p>
        </div>
        <p>
          <a href="${process.env.CLIENT_URL}/applications" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Application
          </a>
        </p>
        <p>Best regards,<br>The Job Finder Team</p>
      </div>
    `;

    return this.sendEmail({
      email: employer.email,
      subject: `New Application for ${job.title}`,
      html
    });
  }

  // Send job alert to users
  async sendJobAlert(user, jobs) {
    const jobList = jobs.map(job => `
      <div style="border-bottom: 1px solid #e5e7eb; padding: 16px 0;">
        <h3 style="margin: 0 0 8px 0;">
          <a href="${process.env.CLIENT_URL}/jobs/${job._id}" style="color: #2563eb; text-decoration: none;">
            ${job.title}
          </a>
        </h3>
        <p style="margin: 4px 0; color: #6b7280;">${job.company.name} - ${job.location.city}, ${job.location.country}</p>
        <p style="margin: 8px 0 0 0;">${job.description.substring(0, 150)}...</p>
      </div>
    `).join('');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Jobs Matching Your Preferences</h2>
        <p>Hi ${user.firstName},</p>
        <p>We found ${jobs.length} new job${jobs.length > 1 ? 's' : ''} that match your preferences:</p>
        <div style="margin: 20px 0;">
          ${jobList}
        </div>
        <p>
          <a href="${process.env.CLIENT_URL}/jobs" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View All Jobs
          </a>
        </p>
        <p>To stop receiving these alerts, update your notification preferences in your account settings.</p>
        <p>Best regards,<br>The Job Finder Team</p>
      </div>
    `;

    return this.sendEmail({
      email: user.email,
      subject: `${jobs.length} New Job Alert${jobs.length > 1 ? 's' : ''}`,
      html
    });
  }

  // Send interview invitation
  async sendInterviewInvitation(applicant, job, interview) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Interview Invitation</h2>
        <p>Hi ${applicant.firstName},</p>
        <p>Congratulations! You have been invited for an interview for the position:</p>
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3 style="margin-top: 0;">${job.title}</h3>
          <p><strong>Date & Time:</strong> ${new Date(interview.scheduledDate).toLocaleString()}</p>
          <p><strong>Type:</strong> ${interview.type}</p>
          <p><strong>Duration:</strong> ${interview.duration} minutes</p>
          ${interview.location ? `<p><strong>Location:</strong> ${interview.location}</p>` : ''}
          ${interview.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${interview.meetingLink}">${interview.meetingLink}</a></p>` : ''}
          ${interview.interviewer ? `<p><strong>Interviewer:</strong> ${interview.interviewer.name} (${interview.interviewer.role})</p>` : ''}
        </div>
        <p>Please confirm your attendance by replying to this email.</p>
        <p>Good luck!</p>
        <p>Best regards,<br>The Job Finder Team</p>
      </div>
    `;

    return this.sendEmail({
      email: applicant.email,
      subject: `Interview Invitation - ${job.title}`,
      html
    });
  }

  // Send application confirmation email
  async sendApplicationConfirmation(email, firstName, jobTitle, companyName) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Application Submitted Successfully!</h2>
        <p>Dear ${firstName},</p>
        <p>Your application for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been successfully submitted.</p>
        <p>We will review your application and get back to you within the next few business days.</p>
        <p>You can track the status of your application by logging into your account.</p>
        <p>Best regards,<br>The Job Finder Team</p>
      </div>
    `;

    return this.sendEmail({
      email,
      subject: `Application Submitted - ${jobTitle} at ${companyName}`,
      html
    });
  }

  // Send interview scheduled email
  async sendInterviewScheduled(email, firstName, jobTitle, companyName, interviewDate) {
    const formattedDate = new Date(interviewDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Interview Scheduled!</h2>
        <p>Dear ${firstName},</p>
        <p>Great news! Your interview for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been scheduled.</p>
        <p><strong>Interview Date & Time:</strong> ${formattedDate}</p>
        <p>Please make sure to:</p>
        <ul>
          <li>Arrive 10 minutes early</li>
          <li>Bring copies of your resume</li>
          <li>Research the company and role</li>
          <li>Prepare questions to ask the interviewer</li>
        </ul>
        <p>If you need to reschedule, please contact the company as soon as possible.</p>
        <p>Good luck with your interview!</p>
        <p>Best regards,<br>The Job Finder Team</p>
      </div>
    `;

    return this.sendEmail({
      email,
      subject: `Interview Scheduled - ${jobTitle} at ${companyName}`,
      html
    });
  }

  // Send job offer email
  async sendJobOffer(email, firstName, jobTitle, companyName, salary) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Congratulations! Job Offer Received</h2>
        <p>Dear ${firstName},</p>
        <p>Congratulations! <strong>${companyName}</strong> has extended a job offer for the position of <strong>${jobTitle}</strong>.</p>
        ${salary ? `<p><strong>Offered Salary:</strong> $${salary.toLocaleString()}/year</p>` : ''}
        <p>Please log into your account to view the complete offer details and respond accordingly.</p>
        <p>This is an exciting milestone in your career journey!</p>
        <p>Best regards,<br>The Job Finder Team</p>
      </div>
    `;

    return this.sendEmail({
      email,
      subject: `Job Offer - ${jobTitle} at ${companyName}`,
      html
    });
  }

  // Send application rejection email
  async sendApplicationRejection(email, firstName, jobTitle, companyName) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Application Update</h2>
        <p>Dear ${firstName},</p>
        <p>Thank you for your interest in the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.</p>
        <p>After careful consideration, we have decided to move forward with other candidates for this position.</p>
        <p>We encourage you to continue exploring other opportunities on our platform and apply for positions that match your skills and interests.</p>
        <p>Thank you for using Job Finder, and we wish you the best in your job search.</p>
        <p>Best regards,<br>The Job Finder Team</p>
      </div>
    `;

    return this.sendEmail({
      email,
      subject: `Application Update - ${jobTitle} at ${companyName}`,
      html
    });
  }
}

module.exports = new EmailService();
