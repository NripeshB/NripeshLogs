import {
  Stack,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Chip,
  Box,
  Container,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Stack spacing={8} py={{ xs: 6, md: 10 }}>

        {/* HERO */}
        <Stack spacing={3} alignItems="flex-start">
          <Box>
            <Typography
              variant="h2"
              fontWeight={800}
              sx={{
                lineHeight: 1.1,
                background:
                  'linear-gradient(90deg, #ffffff, #90caf9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Nripesh Bhusal
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Full-Stack Developer • MERN
            </Typography>
          </Box>

          <Typography
            maxWidth={720}
            color="text.secondary"
            fontSize="1.05rem"
          >
            I design and build production-style full-stack web applications with a
            strong focus on backend architecture, authentication systems, and clean,
            scalable API design. This platform doubles as my portfolio and a
            multi-user blogging system.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            width="100%"
            maxWidth={720}
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/blogs"
              sx={{
                px: 4,
                py: 1.3,
                fontWeight: 600,
                borderRadius: 3,
              }}
            >
              Read Blogs
            </Button>

            <Button
              variant="outlined"
              size="large"
              href="/NripeshCV.pdf"
              target="_blank"
              sx={{ borderRadius: 3 }}
            >
              View CV
            </Button>

            <Button
              variant="outlined"
              size="large"
              href="/certificate-fullstack.png"
              target="_blank"
              sx={{ borderRadius: 3 }}
            >
              FSO Certificate
            </Button>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button
              variant="text"
              href="https://github.com/NripeshB"
              target="_blank"
            >
              GitHub
            </Button>

            <Button
              variant="text"
              href="https://mail.google.com/mail/u/0/#inbox?compose=jrjtXJSwpQrkZWjSnZkzBtSchZcfLPMRpHZxwsbzXKhHXmcxFvVphMxqBsTMRVMsTvTkfdnF"
              target="_blank"
            >
              Email me
            </Button>
          </Stack>
        </Stack>

        <Divider />

        {/* ABOUT */}
        <Stack spacing={2} maxWidth={900}>
          <Typography variant="h5" fontWeight={700}>
            About
          </Typography>

          <Typography color="text.secondary">
            I am a computer science undergraduate with a strong inclination toward
            backend development and system design. I primarily work with Node.js-based
            services, authentication and authorization flows, and production-ready
            MERN applications.
          </Typography>

          <Typography color="text.secondary">
            I have completed the <strong>Full Stack Open</strong> curriculum up to
            Part 7, gaining hands-on experience with modern React, state management,
            backend APIs, testing, and deployment workflows.
          </Typography>
        </Stack>

        <Divider />

        {/* PROJECT */}
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={700}>
            Featured Project
          </Typography>

          <Card
            sx={{
              borderRadius: 4,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h6" fontWeight={600}>
                Multi-User Blogging Platform & Portfolio
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                A full-stack MERN application featuring JWT-based authentication,
                role-based access control (Admin, Author, User), content publishing,
                moderation workflows, and a personal portfolio interface.
              </Typography>

              <Stack
                direction="row"
                flexWrap="wrap"
                gap={1.2}
              >
                {[
                  'React',
                  'Redux Toolkit',
                  'Material UI',
                  'Node.js',
                  'Express',
                  'MongoDB',
                  'JWT',
                  'REST APIs',
                  'Jest',
                ].map((tech) => (
                  <Chip key={tech} label={tech} size="small" />
                ))}
              </Stack>

              <Box mt={3}>
                <Button
                  size="small"
                  component={Link}
                  to="/authors/nripesh"
                >
                  Explore My Blogs →
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Stack>

        <Divider />

        {/* SKILLS */}
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={700}>
            Skills
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1.2}
          >
            {[
              'JavaScript',
              'React',
              'Redux Toolkit',
              'Node.js',
              'Express',
              'MongoDB',
              'REST API Design',
              'JWT Authentication',
              'Jest',
              'Git',
              'Deployment (Vercel, Render)',
            ].map((skill) => (
              <Chip
                key={skill}
                label={skill}
                sx={{ fontWeight: 500 }}
              />
            ))}
          </Stack>
        </Stack>

        <Divider />

        {/* CTA */}
        <Stack spacing={2} maxWidth={720}>
          <Typography variant="h5" fontWeight={700}>
            Let’s connect
          </Typography>

          <Typography color="text.secondary">
            You can read my blogs, review my projects, or explore my code on GitHub.
            I am open to internships, backend-focused roles, and collaborative work.
          </Typography>
        </Stack>

      </Stack>
    </Container>
  )
}

export default Home
