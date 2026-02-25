/**
 * Pre-built Dashboard Template
 *
 * Matches the dashboard UI mockup:
 * - Dark sidebar (left) with user profile & navigation
 * - Main content area (right) with stat cards, charts, and summary panels
 *
 * Uses existing Puck blocks: Layout2, Section, Container, Heading2/3,
 * Paragraph, Span, Card, Image, Button, Divider, TwoColumn, Grid2x2, etc.
 */

export const dashboardTemplate = {
  content: [
    // ==========================================
    // ROOT: Layout2 (Sidebar + Main)
    // ==========================================
    {
      type: "Layout2",
      props: {
        id: "dashboard-root",
        gap: "0px",
        sidebarWidth: "250px",
        sidebarHeight: "100vh",
        sidebar: [
          // ------------------------------------
          // SIDEBAR — Dark navigation panel
          // ------------------------------------
          {
            type: "Section",
            props: {
              id: "sidebar-section",
              backgroundColor: "#1e293b",
              padding: "30px 20px",
              height: "100%",
              children: [
                // User Avatar
                {
                  type: "Container",
                  props: {
                    id: "avatar-wrapper",
                    maxWidth: "100%",
                    children: [
                      {
                        type: "Image",
                        props: {
                          id: "user-avatar",
                          src: "https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=f59e0b&textColor=1e293b&fontSize=40",
                          width: 40,
                          borderRadius: "50%",
                        },
                      },
                    ],
                  },
                },
                // User Name
                {
                  type: "Heading3",
                  props: {
                    id: "user-name",
                    text: "JOHN DON",
                    color: "#ffffff",
                    textAlign: "center",
                  },
                },
                // User Email
                {
                  type: "Paragraph",
                  props: {
                    id: "user-email",
                    text: "johndon@company.com",
                    fontSize: "13px",
                    color: "#94a3b8",
                  },
                },
                // Divider
                {
                  type: "Divider",
                  props: {
                    id: "sidebar-divider",
                    color: "#334155",
                    thickness: "1px",
                    style: "solid",
                    margin: "20px 0",
                  },
                },
                // Nav: Home
                {
                  type: "Paragraph",
                  props: {
                    id: "nav-home",
                    text: "🏠  Home",
                    fontSize: "15px",
                    color: "#e2e8f0",
                  },
                },
                // Nav: File
                {
                  type: "Paragraph",
                  props: {
                    id: "nav-file",
                    text: "📁  File",
                    fontSize: "15px",
                    color: "#cbd5e1",
                  },
                },
                // Nav: Messages
                {
                  type: "Paragraph",
                  props: {
                    id: "nav-messages",
                    text: "💬  Messages",
                    fontSize: "15px",
                    color: "#cbd5e1",
                  },
                },
                // Nav: Notification
                {
                  type: "Paragraph",
                  props: {
                    id: "nav-notification",
                    text: "🔔  Notification",
                    fontSize: "15px",
                    color: "#cbd5e1",
                  },
                },
                // Nav: Location
                {
                  type: "Paragraph",
                  props: {
                    id: "nav-location",
                    text: "📍  Location",
                    fontSize: "15px",
                    color: "#cbd5e1",
                  },
                },
                // Nav: Graph
                {
                  type: "Paragraph",
                  props: {
                    id: "nav-graph",
                    text: "📊  Graph",
                    fontSize: "15px",
                    color: "#cbd5e1",
                  },
                },
              ],
            },
          },
        ],
        main: [
          // ------------------------------------
          // MAIN CONTENT AREA
          // ------------------------------------
          {
            type: "Section",
            props: {
              id: "main-section",
              backgroundColor: "#f1f5f9",
              padding: "30px",
              children: [
                // Title
                {
                  type: "Heading2",
                  props: {
                    id: "dashboard-title",
                    text: "Dashboard User",
                    color: "#1e293b",
                    textAlign: "left",
                  },
                },

                // ==============================
                // ROW 1: 4 Stat Cards
                // ==============================
                {
                  type: "Grid2x2",
                  props: {
                    id: "stat-cards-grid",
                    gap: "16px",
                    topLeft: [
                      {
                        type: "Card",
                        props: {
                          id: "stat-earning",
                          cardTitle: "Earning",
                          cardBody: "$ 628",
                          cardImageUrl: "",
                          backgroundColor: "#ffffff",
                          borderRadius: "12px",
                        },
                      },
                    ],
                    topRight: [
                      {
                        type: "Card",
                        props: {
                          id: "stat-share",
                          cardTitle: "Share",
                          cardBody: "2434",
                          cardImageUrl: "",
                          backgroundColor: "#ffffff",
                          borderRadius: "12px",
                        },
                      },
                    ],
                    bottomLeft: [
                      {
                        type: "Card",
                        props: {
                          id: "stat-likes",
                          cardTitle: "Likes",
                          cardBody: "1259",
                          cardImageUrl: "",
                          backgroundColor: "#ffffff",
                          borderRadius: "12px",
                        },
                      },
                    ],
                    bottomRight: [
                      {
                        type: "Card",
                        props: {
                          id: "stat-rating",
                          cardTitle: "Rating",
                          cardBody: "8.5 ⭐",
                          cardImageUrl: "",
                          backgroundColor: "#ffffff",
                          borderRadius: "12px",
                        },
                      },
                    ],
                  },
                },

                // Spacer
                {
                  type: "Spacer",
                  props: {
                    id: "spacer-1",
                  },
                },

                // ==============================
                // ROW 2: Bar Chart + Donut Chart
                // ==============================
                {
                  type: "TwoColumn",
                  props: {
                    id: "charts-row",
                    gap: "16px",
                    left: [
                      {
                        type: "BarChart",
                        props: {
                          id: "bar-chart",
                          chartTitle: "Result",
                          labels: "JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT",
                          dataset1Label: "Revenue",
                          dataset1Data: "45,62,38,70,55,80,48,65,72,58",
                          dataset1Color: "#1e293b",
                          dataset2Label: "Target",
                          dataset2Data: "50,55,42,60,48,75,52,58,68,62",
                          dataset2Color: "#f59e0b",
                          height: "300px",
                        },
                      },
                    ],
                    right: [
                      {
                        type: "DoughnutChart",
                        props: {
                          id: "donut-chart",
                          chartTitle: "",
                          labels: "Completed,Remaining",
                          data: "45,55",
                          colors: "#f59e0b,#e2e8f0",
                          centerText: "45%",
                          height: "300px",
                        },
                      },
                    ],
                  },
                },

                // Spacer
                {
                  type: "Spacer",
                  props: {
                    id: "spacer-2",
                  },
                },

                // ==============================
                // ROW 3: Area Chart + Summary
                // ==============================
                {
                  type: "TwoColumn",
                  props: {
                    id: "bottom-row",
                    gap: "16px",
                    left: [
                      {
                        type: "AreaChart",
                        props: {
                          id: "area-chart",
                          chartTitle: "Trends",
                          labels: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
                          dataset1Label: "Lorem Ipsum",
                          dataset1Data: "30,45,35,50,40,60,55,70,65,75,68,80",
                          dataset1Color: "#1e293b",
                          dataset2Label: "Dolor Amet",
                          dataset2Data: "20,30,25,35,30,40,38,50,45,55,50,60",
                          dataset2Color: "#f59e0b",
                          height: "300px",
                        },
                      },
                    ],
                    right: [
                      {
                        type: "Section",
                        props: {
                          id: "summary-section",
                          backgroundColor: "#ffffff",
                          padding: "20px",
                          children: [
                            {
                              type: "Heading3",
                              props: {
                                id: "summary-title",
                                text: "Quick Summary",
                                color: "#1e293b",
                                textAlign: "left",
                              },
                            },
                            {
                              type: "Divider",
                              props: {
                                id: "summary-divider",
                                color: "#e2e8f0",
                                thickness: "1px",
                                style: "solid",
                                margin: "12px 0",
                              },
                            },
                            {
                              type: "Paragraph",
                              props: {
                                id: "summary-stat-1",
                                text: "📧  Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                                fontSize: "14px",
                                color: "#475569",
                              },
                            },
                            {
                              type: "Paragraph",
                              props: {
                                id: "summary-stat-2",
                                text: "📊  Sed do eiusmod tempor incididunt ut labore et dolore magna.",
                                fontSize: "14px",
                                color: "#475569",
                              },
                            },
                            {
                              type: "Button",
                              props: {
                                id: "check-now-btn",
                                label: "Check Now",
                                link: "#",
                                backgroundColor: "#f59e0b",
                                color: "#ffffff",
                                padding: "10px 24px",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  root: { props: {} },
};
