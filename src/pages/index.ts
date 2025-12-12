import type { FC } from "react";
import IndexPage from "@/pages/page";
import LoginPage from "@/pages/login";
import HomePage from "@/pages/home";
import JoinPage from "@/pages/join";

interface PageComponents {
  IndexPage: FC,
  LoginPage: FC,
  HomePage: FC,
  JoinPage: FC,
}

const PageRoutes: PageComponents = {
  IndexPage,
  LoginPage,
  HomePage,
  JoinPage,
}

export default PageRoutes;