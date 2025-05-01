const prompts = [
  {
    id: 'dev_insight',
    title: '🔍 Dev Insight or Tip of the Day',
    prompt: 'Give me a detailed, insightful developer tip or insight that would help an experienced programmer. Include specific examples, code snippets if appropriate, and explain why this matters. This should be advanced enough to be valuable to a professional developer.'
  },
  {
    id: 'tech_stack',
    title: '⚛️ React/Next.js/Node/PostgreSQL/DevOps tip',
    prompt: 'Share an advanced tip related to either React, Next.js, Node.js, PostgreSQL, or DevOps that would help an experienced developer improve their skills. Include code examples where appropriate and explain why this technique or approach is valuable.'
  },
  {
    id: 'trend',
    title: '🤖 Web or AI trend/tool',
    prompt: 'Explain a current trend or tool in Web or AI development (like Bun, LangChain, Astro, etc.) that is gaining traction among developers. Discuss its key features, benefits, potential use cases, and why developers should pay attention to it. Include examples of how it can be used.'
  },
  {
    id: 'soft_skill',
    title: '🧠 Soft skill or focus hack',
    prompt: 'Describe a specific soft skill or focus technique for developers that can improve productivity, teamwork, or career growth. Provide concrete examples of how to implement this technique, its benefits, and how to measure its effectiveness.'
  },
  {
    id: 'blog_post',
    title: '🛠️ Blog post-style write-up from a top company',
    prompt: 'Write a technical blog post in the style of Stripe/Uber/Netflix engineering blog that deep dives into a challenging technical problem and how it was solved. Include technical details, architectural decisions, and lessons learned that would be valuable for senior developers.'
  },
  {
    id: 'career',
    title: '📈 Career or job-prep tip',
    prompt: 'Provide an in-depth career development or job prep tip for experienced developers looking to advance their careers. Cover strategies for navigating technical interviews, negotiating offers, improving visibility at work, or positioning for promotion to senior or leadership roles.'
  },
  {
    id: 'motivation',
    title: '💡 Motivation, quote, or real dev story',
    prompt: 'Share an inspiring developer story, quote with detailed explanation, or personal growth narrative that would resonate with experienced software engineers. Connect the story to practical lessons or insights that can help motivate developers through challenging projects or career transitions.'
  }
];

export default prompts;