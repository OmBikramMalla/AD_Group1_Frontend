import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      {/* LEFT - LOGO */}
      <div style={styles.logo}>
      Auto<span style={{ color: "#0f172a" }}>Logistics</span> Pro
      </div>

      {/* CENTER - SEARCH */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search parts..."
          style={styles.searchInput}
        />
      </div>

      {/* RIGHT - NAV LINKS */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/about" style={styles.link}>About</Link>

        <span style={styles.icon}>🔔</span>
        <span style={styles.icon}>❓</span>

        <Link to="/login" style={styles.profileBtn}>
          Profile
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 32px",
    background: "white",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  logo: {
    fontWeight: "800",
    fontSize: "18px",
  },

  searchBox: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },

  searchInput: {
    width: "60%",
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    outline: "none",
    background: "#f8fafc",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  link: {
    textDecoration: "none",
    color: "#334155",
    fontWeight: "600",
  },

  icon: {
    fontSize: "16px",
    cursor: "pointer",
  },

  profileBtn: {
    background: "#0f172a",
    color: "white",
    padding: "8px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Navbar;