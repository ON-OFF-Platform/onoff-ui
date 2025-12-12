/* src/utils.path.js; PATH 객체를 사용하여 라우팅 경로를 관리 */

interface PathComponents {
  INDEX: string,
  LOGIN: string,
  HOME: string,
  JOIN: string,
}

export const PATH: PathComponents = {
  INDEX: '/',
  LOGIN: '/login',
  HOME: '/home',
  JOIN: '/join',
}

export const deployHostName: string = import.meta.env.VITE_DEPLOY_HOSTNAME || 'http://localhost:5173';