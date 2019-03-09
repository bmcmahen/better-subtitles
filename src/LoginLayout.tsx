/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  theme,
  responsiveBodyPadding,
  Navbar,
  Toolbar,
  Breadcrumb,
  BreadcrumbItem,
  Link,
  Avatar,
  IconButton,
  Popover,
  MenuList,
  MenuItem
} from "sancho";
import { useSession, signOut } from "./auth";

export interface LoginLayoutProps {
  children?: React.ReactNode;
  title: string;
}

export const LoginLayout: React.FunctionComponent<LoginLayoutProps> = ({
  children,
  title
}) => {
  const user = useSession();
  return (
    <React.Fragment>
      <Global
        styles={{
          body: {
            backgroundAttachment: "fixed",
            backgroundColor: theme.colors.palette.blue.lightest,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23579ad9' fill-opacity='0.17'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }
        }}
      />
      <Navbar css={{ background: "transparent", boxShadow: "none" }}>
        <Toolbar css={{ justifyContent: "space-between" }}>
          <Breadcrumb css={{ background: "white" }}>
            <BreadcrumbItem>
              <Link component={RouterLink} to="/">
                Fiddleware Subtitles
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{title}</BreadcrumbItem>
          </Breadcrumb>
          {user && (
            <Popover
              content={
                <MenuList>
                  <MenuItem onSelect={signOut}>Sign out</MenuItem>
                  <MenuItem />
                </MenuList>
              }
            >
              <IconButton
                variant="ghost"
                size="sm"
                icon={
                  <Avatar
                    size="sm"
                    src={user.photoURL || undefined}
                    name={user.displayName || user!.email || "?"}
                  />
                }
                label={user.displayName || user!.email || "?"}
              />
            </Popover>
          )}
        </Toolbar>
      </Navbar>
      <div
        css={[
          {
            display: "flex",
            justifyContent: "center"
          },
          responsiveBodyPadding
        ]}
      >
        {children}
      </div>
    </React.Fragment>
  );
};