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
  <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 4 } }}>
    <Stack spacing={{ xs: 4, md: 6 }}>

      {/* HERO */}
      <Stack spacing={{ xs: 3, md: 2 }}>
        <Typography 
          variant={{ xs: "h4", md: "h3" }} 
          fontWeight={600}
          sx={{ 
            lineHeight: 1.2,
            mb: 1 
          }}
        >
          Nripesh Bhusal
        </Typography>

        <Typography 
          variant={{ xs: "h6", md: "h6" }} 
          color="text.secondary"
          sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
        >
          Full-Stack Developer • MERN
        </Typography>

        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            maxWidth: { xs: '100%', md: 720 },
            lineHeight: 1.7,
            fontSize: { xs: '1rem', sm: '1.05rem' }
          }}
        >
          I build and deploy full-stack web applications with an emphasis on
          backend architecture, authentication systems, and clean API design.
          This platform is both my personal portfolio and a multi-user blogging system.
        </Typography>

        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={{ xs: 1.5, sm: 2 }} 
          sx={{ width: '100%' }}
        >
          <Button
            variant="contained"
            component={Link}
            to="/blogs"
            fullWidth
            sx={{ 
              py: 1.5,
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}
          >
            Read Blogs
          </Button>

          <Button
            variant="outlined"
            href="/NripeshCV.pdf"
            target="_blank"
            fullWidth
            sx={{ py: 1.5 }}
          >
            View CV
          </Button>

          <Button
            variant="outlined"
            href="/certificate-fullstack.png"
            target="_blank"
            fullWidth
            sx={{ py: 1.5 }}
          >
            FSO Certificate
          </Button>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} width="100%">
            <Button
              variant="text"
              href="https://github.com/NripeshB"
              target="_blank"
              fullWidth
              sx={{ py: 1.2, justifyContent: 'center' }}
            >
              GitHub
            </Button>
            <Button
              variant="text"
              href="https://mail.google.com/mail/u/nripesh.bhusal@gmail.com"
              target="_blank"
              fullWidth
              sx={{ py: 1.2, justifyContent: 'center' }}
            >
              Email me
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Divider sx={{ borderBottomWidth: 2 }} />

      {/* ABOUT */}
      <Stack spacing={{ xs: 2, md: 2 }}>
        <Typography 
          variant={{ xs: "h6", md: "h5" }} 
          sx={{ fontWeight: 700 }}
        >
          About
        </Typography>

        <Typography 
          color="text.secondary" 
          sx={{ 
            maxWidth: { xs: '100%', md: 820 },
            lineHeight: 1.7,
            fontSize: { xs: '1rem', sm: '1.05rem' }
          }}
        >
          I am a computer science undergraduate with a strong interest in backend
          development and system design. My work focuses on Node.js-based services,
          authentication and authorization flows, and building maintainable,
          production-style applications using the MERN stack.
        </Typography>

        <Typography 
          color="text.secondary" 
          sx={{ 
            maxWidth: { xs: '100%', md: 820 },
            lineHeight: 1.7,
            fontSize: { xs: '1rem', sm: '1.05rem' }
          }}
        >
          I have completed the <strong>Full Stack Open</strong> curriculum up to Part 7,
          gaining hands-on experience with modern React, state management,
          backend APIs, and deployment workflows.
        </Typography>
      </Stack>

      <Divider sx={{ borderBottomWidth: 2 }} />

      {/* PROJECT */}
      <Stack spacing={2}>
        <Typography 
          variant={{ xs: "h6", md: "h5" }} 
          sx={{ fontWeight: 700 }}
        >
          Featured Projects
        </Typography>

        <Card variant="outlined" sx={{ maxWidth: { xs: '100%', md: 600 } }}>
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
              Multi-User Blogging Platform & Portfolio
            </Typography>

            <Typography 
              color="text.secondary" 
              sx={{ 
                mb: 2, 
                lineHeight: 1.6,
                fontSize: { xs: '0.95rem', sm: '1rem' }
              }}
            >
              A full-stack MERN application featuring JWT-based authentication,
              role-based access control (Admin, Author, User), content publishing,
              and moderation workflows. The application also serves as my personal
              portfolio homepage.
            </Typography>

            <Stack spacing={2}>

            <Stack spacing={1}
              direction="row"
              flexWrap="wrap"
              gap={1.2}
              sx={{ maxWidth: { xs: '100%', md: 600 } }}>
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
            
            <Button
              size="small"
              component={Link}
              to="/authors/nripesh"
              variant="outlined"
              >
              Explore My Blogs
            </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Divider sx={{ borderBottomWidth: 2 }} />

      {/* SKILLS */}
      <Stack spacing={2}>
        <Typography 
          variant={{ xs: "h6", md: "h5" }} 
          sx={{ fontWeight: 700 }}
        >
          Skills
        </Typography>

        <Stack 
          spacing={1}
          direction="row"
          flexWrap="wrap"
          gap={1.2}
          sx={{ maxWidth: { xs: '100%', md: 600 } }}
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
            <Chip key={skill} label={skill} size="small" />
          ))}
        </Stack>
      </Stack>

      <Divider sx={{ borderBottomWidth: 2 }} />

      {/* CTA */}
      <Stack spacing={{ xs: 2, md: 1 }}>
        <Typography 
          variant={{ xs: "h6", md: "h6" }} 
          sx={{ fontWeight: 700 }}
        >
          Get in touch
        </Typography>

        <Typography 
          color="text.secondary"
          sx={{ 
            lineHeight: 1.6,
            fontSize: { xs: '1rem', sm: '1.05rem' }
          }}
        >
          You can read my blogs, review my projects, or explore my code on GitHub.
          I am open to internships, backend-focused roles, and collaborative projects.
        </Typography>
      </Stack>
    </Stack>
  </Box>
)

}

export default Home
