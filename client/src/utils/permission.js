export const isAdmin = (user) => user?.role === 'admin'

export const isAuthor = (user) =>
  user?.role === 'author' || user?.role === 'admin'

export const canEditOwn = (user, resource) =>
  user && resource && user.id === resource.author.id
