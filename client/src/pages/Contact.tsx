import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'motion/react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { colors, ease } from '../theme';
import { profile } from '../data/content';
import { sendContactMessage } from '../api';
import Reveal from '../components/Reveal';
import { Container, gutters } from '../components/Section';

const MotionBox = motion.create(Box);

interface FormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const emptyForm: FormState = { fullName: '', email: '', subject: '', message: '' };

type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!form.email.trim()) errors.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid email.';
  if (!form.message.trim()) errors.message = 'Please write a message.';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<{ severity: 'success' | 'error'; text: string } | null>(null);

  const update = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (sending) return;

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSending(true);
    const result = await sendContactMessage({
      fullName: form.fullName,
      email: form.email,
      service: form.subject.trim() || 'General Message',
      message: form.message,
    });
    setSending(false);

    if (result.ok) {
      setForm(emptyForm);
      setNotice({ severity: 'success', text: 'Thank you! Your message has been sent successfully.' });
    } else {
      if (result.errors) setErrors(result.errors);
      setNotice({ severity: 'error', text: result.message || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        pt: { xs: '90px', lg: '120px' },
        pb: { xs: '60px', lg: '100px' },
        background: 'linear-gradient(180deg, #F0F4FA 0%, #E8EEF8 50%, #F5F7FB 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Colorful Ambient Glow Bubbles */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 2, ...gutters }}>
        {/* Top Hero Banner */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            mb: { xs: '40px', md: '56px' },
          }}
        >
          {/* Active Status Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              px: '14px',
              py: '6px',
              borderRadius: '20px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#059669',
              fontSize: 12.5,
              fontWeight: 600,
              mb: '18px',
            }}
          >
            <Box
              component="span"
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 8px #10B981',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.4, transform: 'scale(0.85)' },
                },
              }}
            />
            Available for Full-Time Roles & Web Projects
          </MotionBox>

          {/* Vibrant Gradient Headline */}
          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 32, sm: 44, md: 56 },
                fontWeight: 700,
                color: colors.ink,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                mb: '14px',
              }}
            >
              Let’s Build Something{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #06B6D4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Extraordinary.
              </Box>
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            sx={{ maxWidth: 640 }}
          >
            <Typography
              sx={{
                fontSize: { xs: 15, md: 17 },
                color: colors.text,
                lineHeight: 1.6,
              }}
            >
              Interested in discussing a developer opportunity, role, or web project? Reach out through any channel below or send a message directly.
            </Typography>
          </MotionBox>
        </Box>

        {/* 2-Column Main Section: Left Direct Channels, Right Styled Form */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: { xs: '32px', lg: '48px' },
            alignItems: 'stretch',
          }}
        >
          {/* Left Column: Colorful Direct Contact Cards */}
          <Reveal
            sx={{
              flex: '1 1 42%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Email Card (Royal Blue Theme) */}
            <Box
              sx={{
                p: { xs: '20px', md: '26px' },
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid rgba(37, 99, 235, 0.2)',
                boxShadow: '0 10px 30px rgba(37, 99, 235, 0.06)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 14px 35px rgba(37, 99, 235, 0.12)',
                  borderColor: '#2563EB',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px', mb: '12px' }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    color: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  ✉️
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Direct Email
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: colors.text }}>
                    Quickest way to reach me
                  </Typography>
                </Box>
              </Box>

              <Typography
                component="a"
                href={`mailto:${profile.email}`}
                sx={{
                  display: 'block',
                  fontSize: { xs: 15, sm: 17 },
                  fontWeight: 600,
                  color: colors.ink,
                  textDecoration: 'none',
                  overflowWrap: 'anywhere',
                  mb: '14px',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#2563EB' },
                }}
              >
                {profile.email}
              </Typography>

              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Box
                  component="a"
                  href={`mailto:${profile.email}`}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    px: '14px',
                    py: '6px',
                    borderRadius: '8px',
                    backgroundColor: '#2563EB',
                    color: colors.white,
                    fontSize: 12.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': { backgroundColor: '#1D4ED8' },
                  }}
                >
                  Send Email ↗
                </Box>
                <Box
                  component="button"
                  onClick={copyEmail}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    px: '14px',
                    py: '6px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(37, 99, 235, 0.08)',
                    color: '#2563EB',
                    border: '1px solid rgba(37, 99, 235, 0.2)',
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.15)' },
                  }}
                >
                  {copied ? '✓ Copied!' : 'Copy Address'}
                </Box>
              </Box>
            </Box>

            {/* Phone & WhatsApp Card (Emerald Theme) */}
            <Box
              sx={{
                p: { xs: '20px', md: '26px' },
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.06)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 14px 35px rgba(16, 185, 129, 0.12)',
                  borderColor: '#10B981',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px', mb: '12px' }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  📞
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Phone & WhatsApp
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: colors.text }}>
                    Direct call or instant message
                  </Typography>
                </Box>
              </Box>

              <Typography
                component="a"
                href={profile.phoneHref}
                sx={{
                  display: 'block',
                  fontSize: { xs: 16, sm: 18 },
                  fontWeight: 600,
                  color: colors.ink,
                  textDecoration: 'none',
                  mb: '14px',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#059669' },
                }}
              >
                {profile.phone}
              </Typography>

              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Box
                  component="a"
                  href="https://wa.me/916369621417"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    px: '14px',
                    py: '6px',
                    borderRadius: '8px',
                    backgroundColor: '#10B981',
                    color: colors.white,
                    fontSize: 12.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': { backgroundColor: '#059669' },
                  }}
                >
                  WhatsApp Chat ↗
                </Box>
                <Box
                  component="a"
                  href={profile.phoneHref}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    px: '14px',
                    py: '6px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    color: '#059669',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    fontSize: 12.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': { backgroundColor: 'rgba(16, 185, 129, 0.15)' },
                  }}
                >
                  Call Direct
                </Box>
              </Box>
            </Box>

            {/* Location & Social Card (Violet / Indigo Theme) */}
            <Box
              sx={{
                p: { xs: '20px', md: '26px' },
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.06)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px', mb: '12px' }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    color: '#7C3AED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  📍
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Location & Profiles
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: colors.text }}>
                    Based in Tamil Nadu, India
                  </Typography>
                </Box>
              </Box>

              <Typography sx={{ fontSize: 15, fontWeight: 600, color: colors.ink, mb: '4px' }}>
                {profile.location[0]}
              </Typography>
              <Typography sx={{ fontSize: 13, color: colors.text, mb: '16px' }}>
                {profile.location[1]} • Open to Remote & Relocation
              </Typography>

              {/* Social Links */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <Box
                  component="a"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    px: '14px',
                    py: '6px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(10, 102, 194, 0.1)',
                    color: '#0A66C2',
                    border: '1px solid rgba(10, 102, 194, 0.25)',
                    fontSize: 12.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#0A66C2',
                      color: colors.white,
                    },
                  }}
                >
                  LinkedIn Profile ↗
                </Box>

                <Box
                  component="a"
                  href="https://github.com/Kalaiyarasi-Ravi"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    px: '14px',
                    py: '6px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(36, 41, 47, 0.08)',
                    color: '#24292F',
                    border: '1px solid rgba(36, 41, 47, 0.2)',
                    fontSize: 12.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#24292F',
                      color: colors.white,
                    },
                  }}
                >
                  GitHub Repositories ↗
                </Box>
              </Box>
            </Box>
          </Reveal>

          {/* Right Column: Vibrant Glassmorphic Contact Form */}
          <Reveal
            y={40}
            sx={{
              flex: '1 1 58%',
              minWidth: 0,
              p: { xs: '24px', sm: '32px', md: '40px' },
              borderRadius: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              border: '1.5px solid rgba(37, 99, 235, 0.18)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 0 40px rgba(59, 130, 246, 0.06)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Box sx={{ mb: '28px' }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: 22, md: 28 },
                  fontWeight: 700,
                  color: colors.ink,
                  mb: '6px',
                  letterSpacing: '-0.01em',
                }}
              >
                Send a Message
              </Typography>
              <Typography sx={{ fontSize: 14, color: colors.text }}>
                Have a question, opportunity, or simply want to connect? Send a note below.
              </Typography>
            </Box>

            <Box
              component="form"
              noValidate
              onSubmit={submit}
              sx={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
            >
              {/* Name Field */}
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: colors.ink, mb: '8px' }}>
                  Your Full Name *
                </Typography>
                <TextField
                  id="contact-name"
                  variant="outlined"
                  fullWidth
                  placeholder="e.g. John Doe"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={update('fullName')}
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: 'rgba(248, 250, 252, 0.8)',
                      transition: 'all 0.2s ease',
                      '&:hover fieldset': { borderColor: '#2563EB' },
                      '&.Mui-focused fieldset': { borderColor: '#2563EB', borderWidth: 2 },
                    },
                    '& .MuiInputBase-input': { fontSize: 14.5, py: '12px', px: '14px' },
                  }}
                />
              </Box>

              {/* Email Field */}
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: colors.ink, mb: '8px' }}>
                  Your Email Address *
                </Typography>
                <TextField
                  id="contact-email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  placeholder="e.g. john@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: 'rgba(248, 250, 252, 0.8)',
                      transition: 'all 0.2s ease',
                      '&:hover fieldset': { borderColor: '#2563EB' },
                      '&.Mui-focused fieldset': { borderColor: '#2563EB', borderWidth: 2 },
                    },
                    '& .MuiInputBase-input': { fontSize: 14.5, py: '12px', px: '14px' },
                  }}
                />
              </Box>

              {/* Subject Field */}
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: colors.ink, mb: '8px' }}>
                  Subject (Optional)
                </Typography>
                <TextField
                  id="contact-subject"
                  variant="outlined"
                  fullWidth
                  placeholder="e.g. Job Opportunity / Project Discussion / Hello"
                  value={form.subject}
                  onChange={update('subject')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: 'rgba(248, 250, 252, 0.8)',
                      transition: 'all 0.2s ease',
                      '&:hover fieldset': { borderColor: '#2563EB' },
                      '&.Mui-focused fieldset': { borderColor: '#2563EB', borderWidth: 2 },
                    },
                    '& .MuiInputBase-input': { fontSize: 14.5, py: '12px', px: '14px' },
                  }}
                />
              </Box>

              {/* Message Field */}
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: colors.ink, mb: '8px' }}>
                  Your Message *
                </Typography>
                <TextField
                  id="contact-message"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={4}
                  placeholder="Write your message or inquiry here..."
                  value={form.message}
                  onChange={update('message')}
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: 'rgba(248, 250, 252, 0.8)',
                      transition: 'all 0.2s ease',
                      '&:hover fieldset': { borderColor: '#2563EB' },
                      '&.Mui-focused fieldset': { borderColor: '#2563EB', borderWidth: 2 },
                    },
                    '& .MuiInputBase-input': { fontSize: 14.5, p: '14px' },
                  }}
                />
              </Box>

              {/* Submit CTA Button */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', pt: '6px' }}>
                <Box
                  component="button"
                  type="submit"
                  disabled={sending}
                  sx={{
                    px: '28px',
                    py: '12px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                    color: colors.white,
                    fontSize: 14.5,
                    fontWeight: 600,
                    border: 'none',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
                    transition: 'all 0.25s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    '&:hover:not(:disabled)': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 30px rgba(37, 99, 235, 0.5)',
                      filter: 'brightness(1.08)',
                    },
                  }}
                >
                  {sending ? 'Sending...' : 'Send Message 🚀'}
                </Box>

                <Typography sx={{ fontSize: 12, color: colors.text }}>
                  ⚡ Reply guaranteed within 24 hours
                </Typography>
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Container>

      {/* Snackbar feedback */}
      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={6000}
        onClose={() => setNotice(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={notice?.severity ?? 'success'}
          variant="filled"
          onClose={() => setNotice(null)}
          sx={{ borderRadius: '12px', alignItems: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
        >
          {notice?.text}
        </Alert>
      </Snackbar>
    </Box>
  );
}
