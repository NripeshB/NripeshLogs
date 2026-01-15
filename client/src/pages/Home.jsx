import {
  Stack,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Chip,
  Box,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Stack spacing={6} maxWidth={1000} mx="auto" py={4}>

      {/* HERO */}
      <Stack spacing={2}>
        <Typography variant="h3" fontWeight={600}>
          Nripesh Bhusal
        </Typography>

        <Typography variant="h6" color="text.secondary">
          Full-Stack Developer • MERN
        </Typography>

        <Typography maxWidth={720} color="text.secondary">
          I build and deploy full-stack web applications with an emphasis on
          backend architecture, authentication systems, and clean API design.
          This platform is both my personal portfolio and a multi-user blogging system.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          gap={1.2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          sx={{
            width: '100%',
          }}
        >
          <Button
            variant="contained"
            component={Link}
            to="/blogs"
            fullWidth
          >
            Read Blogs
          </Button>

          <Button
            variant="outlined"
            href="/NripeshCV.pdf"
            target="_blank"
            fullWidth
          >
            View CV
          </Button>

          <Button
            variant="outlined"
            href="/certificate-fullstack.png"
            target="_blank"
            fullWidth
          >
            FSO Certificate
          </Button>

          <Button
            variant="text"
            href="https://github.com/NripeshB"
            target="_blank"
            fullWidth
          >
            GitHub
          </Button>

          <Button
            variant="text"
            href="https://mail.google.com/mail/u/0/#inbox?compose=jrjtXJSwpQrkZWjSnZkzBtSchZcfLPMRpHZxwsbzXKhHXmcxFvVphMxqBsTMRVMsTvTkfdnF"
            target="_blank"
            fullWidth
          >
            Email me
          </Button>
        </Stack>

      </Stack>

      <Divider />

      {/* ABOUT */}
      <Stack spacing={2}>
        <Typography variant="h5">About</Typography>

        <Typography color="text.secondary" maxWidth={820}>
          I am a computer science undergraduate with a strong interest in backend
          development and system design. My work focuses on Node.js-based services,
          authentication and authorization flows, and building maintainable,
          production-style applications using the MERN stack.
        </Typography>

        <Typography color="text.secondary" maxWidth={820}>
          I have completed the <strong>Full Stack Open</strong> curriculum up to Part 7,
          gaining hands-on experience with modern React, state management,
          backend APIs, and deployment workflows.
        </Typography>
      </Stack>

      <Divider />

      {/* PROJECT */}
      <Stack spacing={2}>
        <Typography variant="h5">Featured Projects</Typography>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">
              Multi-User Blogging Platform & Portfolio
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 2 }}>
              A full-stack MERN application featuring JWT-based authentication,
              role-based access control (Admin, Author, User), content publishing,
              and moderation workflows. The application also serves as my personal
              portfolio homepage.
            </Typography>

            <Stack direction="row"
        flexWrap="wrap"
        gap={1.2}>
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

            <Box mt={2}>
              <Button
                size="small"
                component={Link}
                to="/authors/nripesh"
              >
                Explore My Blogs
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Stack>

      <Divider />

      {/* SKILLS */}
      <Stack spacing={1}>
      <CardContent>
            <Typography variant="h6">
              Skills: 
            </Typography>

            
            
      <Stack spacing={1}
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
          <Chip key={skill} label={skill} />
        ))}
      </Stack>
      </CardContent>
      </Stack>
      <Divider />

      {/* CTA */}
      <Stack spacing={1}>
        <Typography variant="h6">
          Get in touch
        </Typography>

        <Typography color="text.secondary">
          You can read my blogs, review my projects, or explore my code on GitHub.
          I am open to internships, backend-focused roles, and collaborative projects.
        </Typography>
      </Stack>

    </Stack>
  )
}

export default Home
