import { siteConfig } from "@/config/site.config";

export const Footer = () => {
  return (
    <footer
      style={{
        background: "#d4d0c8",
        borderTop: "2px solid #ffffff",
        borderBottom: "none",
        position: "sticky",
        bottom: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "32px",
          padding: "0 4px",
          gap: "4px",
        }}
      >
        {/* Start button */}
        <button
          style={{
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: "11px",
            fontWeight: "bold",
            color: "#000000",
            background: "#d4d0c8",
            borderTop: "2px solid #ffffff",
            borderLeft: "2px solid #ffffff",
            borderRight: "2px solid #404040",
            borderBottom: "2px solid #404040",
            padding: "2px 8px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            cursor: "default",
          }}
        >
          <span style={{ fontSize: "14px" }}>⊞</span> Start
        </button>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "20px",
            background: "#808080",
            borderRight: "1px solid #ffffff",
          }}
        />

        {/* Open window tab */}
        <div
          style={{
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: "11px",
            color: "#000000",
            background: "#c0bdb5",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderRight: "2px solid #ffffff",
            borderBottom: "2px solid #ffffff",
            padding: "2px 8px",
            cursor: "default",
            maxWidth: "160px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          📄 @trezo/evm – Docs
        </div>

        {/* System tray */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "2px 6px",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderRight: "2px solid #ffffff",
            borderBottom: "2px solid #ffffff",
            background: "#d4d0c8",
          }}
        >
          <span style={{ fontSize: "10px" }}>🔊</span>
          <span
            style={{
              fontFamily: "Tahoma, Arial, sans-serif",
              fontSize: "11px",
              color: "#000000",
            }}
          >
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    </footer>
  );
};
