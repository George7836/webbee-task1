import { handleRoute } from "./router";

const path = window.location.pathname
if(path.includes('/map')) {
  handleRoute('/map')
} else if(path.includes('/time')) {
  handleRoute('/time')
}
