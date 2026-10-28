"use client";

import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="loading-brand"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        LÀNG TRONG PHỐ
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>
      </motion.div>
      <motion.p
        style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 20 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        Đang tải bản đồ di sản…
      </motion.p>
    </motion.div>
  );
}
