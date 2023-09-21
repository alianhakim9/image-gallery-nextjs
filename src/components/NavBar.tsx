"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

interface NavbarLink {
  title: string;
  url: string;
  isActived: boolean;
}

export default function NavBar() {
  const pathname = usePathname();
  const links: Array<NavbarLink> = [
    {
      title: "About",
      url: "/about",
      isActived: pathname === "/about",
    },
    {
      title: "Static",
      url: "/static",
      isActived: pathname === "/static",
    },
    {
      title: "Dynamic",
      url: "/dynamic",
      isActived: pathname === "/dynamic",
    },
    {
      title: "ISR",
      url: "/isr",
      isActived: pathname === "/isr",
    },
    {
      title: "Search",
      url: "/search",
      isActived: pathname === "/search",
    },
  ];
  const dropdownLinks: Array<NavbarLink> = [
    {
      title: "Health",
      url: "/topics/health",
      isActived: pathname === "/topics/health",
    },
    {
      title: "Indie",
      url: "/topics/indie",
      isActived: pathname === "/topics/indie",
    },
    {
      title: "Skateboard",
      url: "/topics/skateboard",
      isActived: pathname === "/topics/skateboard",
    },
  ];
  console.log(pathname);

  return (
    <Navbar
      sticky="top"
      bg="light"
      variant="light"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          <Navbar.Text>Image Gallery</Navbar.Text>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {links.map((link, index) => (
              <Nav.Link
                as={Link}
                href={link.url}
                active={link.isActived}
                className={`${link.isActived ? "text-primary" : "text-muted"}`}
                key={index}
              >
                {link.title}
              </Nav.Link>
            ))}
          </Nav>
          <NavDropdown title="Topics" id="topics-dropdown">
            {dropdownLinks.map((link) => (
              <NavDropdown.Item as={Link} href={link.url} key={link.title}>
                {link.title}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
