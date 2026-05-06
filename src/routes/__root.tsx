import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TrackIcon — We Deliver Results, Not Just Tools' },
      { name: 'description', content: 'Websites, Apps & AI Automation built to generate leads, convert customers, and grow your business — all done-for-you with personal 1-on-1 support.' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Hidden form for Netlify Forms detection */}
        <form name="contact" data-netlify="true" hidden>
          <input type="text" name="name" />
          <input type="tel" name="phone" />
          <input type="email" name="email" />
          <input type="text" name="subject" />
          <select name="service"><option value=""></option></select>
          <textarea name="message" />
        </form>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
