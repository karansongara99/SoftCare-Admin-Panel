// app/(auth)/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Authentication | SoftCare OPD",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect and Google Fonts */}
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet"
        />

        {/* Vendor CSS */}
        <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
        <link href="/assets/vendor/quill/quill.snow.css" rel="stylesheet" />
        <link href="/assets/vendor/quill/quill.bubble.css" rel="stylesheet" />
        <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
        <link href="/assets/vendor/simple-datatables/style.css" rel="stylesheet" />

        {/* Main CSS */}
        <link href="/assets/css/style.css" rel="stylesheet" />
      </head>
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f6f9ff",
        }}
      >
        {children}
      </div>
      {/* Scripts */}
      <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="beforeInteractive"></Script>
      <Script src="/assets/vendor/chart.js/chart.umd.js" strategy="lazyOnload" ></Script>
      <Script src="/assets/vendor/echarts/echarts.min.js" strategy="lazyOnload" ></Script>
      <Script src="/assets/vendor/quill/quill.js" strategy="lazyOnload" ></Script>
      <Script src="/assets/vendor/simple-datatables/simple-datatables.js" strategy="lazyOnload" ></Script>
      <Script src="/assets/vendor/tinymce/tinymce.min.js" strategy="lazyOnload" ></Script>
      <Script src="/assets/vendor/php-email-form/validate.js" strategy="lazyOnload" ></Script>
      <Script src="/assets/js/main.js" strategy="lazyOnload" ></Script>
    </html>
  );
}
