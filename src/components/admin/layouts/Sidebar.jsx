import React from "react";
import { Link } from "react-router-dom";
function Sidebar(props) {
    return (
        <div>
            <div className="leftside-menu">
                {/* LOGO */}
                <Link to="/" className="logo text-center logo-light">
                    <span className="logo-lg">
                        <img src="/assets/images/logo.png" aria-hidden="true" alt="" height={16} />
                    </span>
                    <span className="logo-sm">
                        <img src="/assets/images/logo_sm.png" aria-hidden="true" alt="" height={16} />
                    </span>
                </Link>
                {/* LOGO */}
                <Link to="/" className="logo text-center logo-dark">
                    <span className="logo-lg">
                        <img
                            src="/assets/images/logo-dark.png"
                            alt=""
                            height={16}
                        />
                    </span>
                    <span className="logo-sm">
                        <img
                            src="/assets/images/logo_sm_dark.png"
                            alt=""
                            height={16}
                        />
                    </span>
                </Link>
                <div
                    className="h-100"
                    id="leftside-menu-container"
                    data-simplebar
                >
                    {/*- Sidemenu */}
                    <ul className="side-nav">
                        <li className="side-nav-title side-nav-item">
                            Navigation
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarDashboards"
                                aria-expanded="false"
                                aria-controls="sidebarDashboards"
                                className="side-nav-link"
                            >
                                <i className="uil-home-alt" />
                                <span className="badge bg-success float-end">
                                    4
                                </span>
                                <span> Thống kê </span>
                            </a>
                            <div className="collapse" id="sidebarDashboards">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="dashboard-analytics.html">
                                            Analytics
                                        </a>
                                    </li>
                                    <li>
                                        <a href="dashboard-crm.html">CRM</a>
                                    </li>
                                    <li>
                                        <a href="index.html">Ecommerce</a>
                                    </li>
                                    <li>
                                        <a href="dashboard-projects.html">
                                            Projects
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="side-nav-title side-nav-item">
                            Chức năng quản trị viên
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarUser"
                                aria-expanded="false"
                                aria-controls="sidebarUser"
                                className="side-nav-link"
                            >
                                <i className="uil-home-alt" />
                                <span> Quản lý cơ sở </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarUser">
                                <ul className="side-nav-second-level">
                                    <li >
                                        <Link to="/admin/hotel">
                                            Danh sách khách sạn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/hotel/add">
                                            Thêm khách sạn
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarHotel"
                                aria-expanded="false"
                                aria-controls="sidebarHotel"
                                className="side-nav-link"
                            >
                                <i className="uil-users-alt" />
                                <span> Quản lý nhân viên </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarHotel">
                                <ul className="side-nav-second-level">
                                    <li >
                                        <Link to="/admin/user">
                                            Danh sách tài khoản
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/user/add">
                                            Thêm nhân viên
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarRoom"
                                aria-expanded="false"
                                aria-controls="sidebarRoom"
                                className="side-nav-link"
                            >
                                <i className="uil-web-grid" />
                                <span> Quản lý phòng </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarRoom">
                                <ul className="side-nav-second-level">
                                    <li >
                                        <Link to="/admin/room">
                                            Danh sách phòng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/room/add">
                                            Sửa phòng
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarTypeRoom"
                                aria-expanded="false"
                                aria-controls="sidebarTypeRoom"
                                className="side-nav-link"
                            >
                                <i className="uil-list-ui-alt" />
                                <span> Quản lý loại phòng </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarTypeRoom">
                                <ul className="side-nav-second-level">
                                    <li >
                                        <Link to="/admin/type-room">
                                            Danh sách loại phòng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/type-room/add">
                                            Sửa loại phòng
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarEcommerce"
                                aria-expanded="false"
                                aria-controls="sidebarEcommerce"
                                className="side-nav-link"
                            >
                                <i className="uil-store" />
                                <span> Quản lý tiện ích </span>
                                <span className="menu-arrow" />
                            </a>
                        </li>

                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarEmail"
                                aria-expanded="false"
                                aria-controls="sidebarEmail"
                                className="side-nav-link"
                            >
                                <i className="uil-envelope" />
                                <span> Quản lý đặt phòng </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarEmail"></div>
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarProjects"
                                aria-expanded="false"
                                aria-controls="sidebarProjects"
                                className="side-nav-link"
                            >
                                <i className="uil-briefcase" />
                                <span> Quản lý vourcher </span>
                                <span className="menu-arrow" />
                            </a>
                            <div
                                className="collapse"
                                id="sidebarProjects"
                            ></div>
                        </li>
                        <li className="side-nav-item">
                            <a
                                href="apps-social-feed.html"
                                className="side-nav-link"
                            >
                                <i className="uil-rss" />
                                <span> Quản lý bài viết </span>
                            </a>
                        </li>
                        <li className="side-nav-item">
                            <a
                                data-bs-toggle="collapse"
                                href="#sidebarTasks"
                                aria-expanded="false"
                                aria-controls="sidebarTasks"
                                className="side-nav-link"
                            >
                                <i className="uil-clipboard-alt" />
                                <span> Quản lý loại phòng </span>
                                <span className="menu-arrow" />
                            </a>
                            <div className="collapse" id="sidebarTasks"></div>
                        </li>
                    </ul>
                    {/* Help Box */}
                    <div className="help-box text-white text-center">
                        <a
                            href="#!"
                            className="float-end close-btn text-white"
                        >
                            <i className="mdi mdi-close" />
                        </a>
                        <img
                            src="/assets/images/help-icon.svg"
                            height={90}
                            alt=""
                        />
                        <h5 className="mt-3">Unlimited Access</h5>
                        <p className="mb-3">
                            Upgrade to plan to get access to unlimited reports
                        </p>
                        <a
                            href="#!"
                            className="btn btn-outline-light btn-sm"
                        >
                            Upgrade
                        </a>
                    </div>
                    {/* end Help Box */}
                    {/* End Sidebar */}
                    <div className="clearfix" />
                </div>
                {/* Sidebar -left */}
            </div>
        </div>
    );
}

export default Sidebar;
