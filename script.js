const SUPABASE_URL =
    "https://zeziupelhhizttpzogob.supabase.co";


const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpleml1cGVsaGhpenR0cHpvZ29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzMjY3NjUsImV4cCI6MjEwNzkwMjc2NX0.ceJGDh4WgGOiRP0MqVPlRKx37cRXhNGKJNsU0DDnEIo";


const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


console.log(
    "HealthDesk connected to Supabase."
);



if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("./service-worker.js")
                .then(registration => {

                    console.log(
                        "HealthDesk service worker registered.",
                        registration
                    );

                })
                .catch(error => {

                    console.error(
                        "Service worker error:",
                        error
                    );

                });

        }
    );

}




const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");

const loginSection =
    document.getElementById("loginSection");

const signupSection =
    document.getElementById("signupSection");

const showSignup =
    document.getElementById("showSignup");

const showLogin =
    document.getElementById("showLogin");



if (showSignup) {

    showSignup.addEventListener(
        "click",
        () => {

            if (loginSection) {
                loginSection.classList.add("hidden");
            }

            if (signupSection) {
                signupSection.classList.remove("hidden");
            }

        }
    );

}


if (showLogin) {

    showLogin.addEventListener(
        "click",
        () => {

            if (signupSection) {
                signupSection.classList.add("hidden");
            }

            if (loginSection) {
                loginSection.classList.remove("hidden");
            }

        }
    );

}




if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const fullNameElement =
                document.getElementById(
                    "signupName"
                );

            const usernameElement =
                document.getElementById(
                    "signupUsername"
                );

            const studentIdElement =
                document.getElementById(
                    "signupStudentId"
                );

            const emailElement =
                document.getElementById(
                    "signupEmail"
                );

            const passwordElement =
                document.getElementById(
                    "signupPassword"
                );

            const confirmPasswordElement =
                document.getElementById(
                    "signupConfirmPassword"
                );


            if (
                !fullNameElement ||
                !usernameElement ||
                !studentIdElement ||
                !emailElement ||
                !passwordElement ||
                !confirmPasswordElement
            ) {

                console.error(
                    "One or more sign-up fields are missing from index.html."
                );

                return;
            }


            const fullName =
                fullNameElement.value.trim();

            const username =
                usernameElement.value.trim();

            const studentId =
                studentIdElement.value.trim();

            const email =
                emailElement.value.trim();

            const password =
                passwordElement.value;

            const confirmPassword =
                confirmPasswordElement.value;


            const message =
                document.getElementById(
                    "signupMessage"
                );


            if (message) {
                message.textContent = "";
            }


            if (
                !fullName ||
                !username ||
                !studentId ||
                !email ||
                !password ||
                !confirmPassword
            ) {

                if (message) {

                    message.textContent =
                        "Please complete all required fields.";

                }

                return;
            }


            if (!email.includes("@")) {

                if (message) {

                    message.textContent =
                        "Please enter a valid email address.";

                }

                return;
            }


            if (password.length < 6) {

                if (message) {

                    message.textContent =
                        "Password must be at least 6 characters.";

                }

                return;
            }


            if (password !== confirmPassword) {

                if (message) {

                    message.textContent =
                        "Passwords do not match.";

                }

                return;
            }


            try {

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .auth
                        .signUp({

                            email: email,

                            password: password,

                            options: {

                                data: {

                                    full_name:
                                        fullName,

                                    username:
                                        username,

                                    student_id:
                                        studentId

                                }

                            }

                        });


                if (error) {
                    throw error;
                }


                if (!data.user) {

                    throw new Error(
                        "Unable to create account."
                    );

                }


                console.log(
                    "Auth account created:",
                    data.user.id
                );


                if (message) {

                    message.textContent =
                        "Account created successfully!";

                }


                signupForm.reset();


                setTimeout(
                    () => {

                        if (signupSection) {

                            signupSection.classList.add(
                                "hidden"
                            );

                        }


                        if (loginSection) {

                            loginSection.classList.remove(
                                "hidden"
                            );

                        }

                    },
                    1200
                );


            } catch (error) {

                console.error(
                    "Sign up error:",
                    error
                );


                if (message) {

                    message.textContent =
                        error.message ||
                        "Unable to create account.";

                }

            }

        }
    );

}



if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "loginEmail"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            if (message) {
                message.textContent = "";
            }


            try {

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .auth
                        .signInWithPassword({

                            email:
                                email,

                            password:
                                password

                        });


                if (error) {
                    throw error;
                }


                if (!data.user) {

                    throw new Error(
                        "Login failed."
                    );

                }


                if (message) {

                    message.textContent =
                        "Login successful!";

                }


                window.location.href =
                    "dashboard.html";


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                if (message) {

                    message.textContent =
                        "Incorrect email or password.";

                }

            }

        }
    );

}




const adminLoginForm =
    document.getElementById(
        "adminLoginForm"
    );


if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "adminEmail"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "adminPassword"
                    )
                    .value;


            const message =
                document.getElementById(
                    "adminLoginMessage"
                );


            if (message) {
                message.textContent = "";
            }


            try {

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .auth
                        .signInWithPassword({

                            email:
                                email,

                            password:
                                password

                        });


                if (error) {
                    throw error;
                }


                if (!data.user) {

                    throw new Error(
                        "Supabase did not return a user."
                    );

                }


                const {
                    data: profile,
                    error: profileError
                } =
                    await supabaseClient
                        .from("users")
                        .select(
                            "id, username, full_name, role"
                        )
                        .eq(
                            "id",
                            data.user.id
                        )
                        .single();


                if (profileError) {

                    throw new Error(
                        "Admin account has no valid profile in the users table. " +
                        profileError.message
                    );

                }


                if (profile.role !== "admin") {

                    await supabaseClient
                        .auth
                        .signOut();


                    if (message) {

                        message.textContent =
                            "This account is not an admin. Current role: " +
                            profile.role;

                    }

                    return;
                }


                if (message) {

                    message.textContent =
                        "Admin login successful!";

                }


                window.location.href =
                    "admin.html";


            } catch (error) {

                console.error(
                    "ADMIN LOGIN ERROR:",
                    error
                );


                if (message) {

                    message.textContent =
                        "ERROR: " +
                        (
                            error.message ||
                            "Unknown admin login error."
                        );

                }

            }

        }
    );

}



const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async () => {

            const {
                error
            } =
                await supabaseClient
                    .auth
                    .signOut();


            if (error) {

                console.error(
                    "Logout error:",
                    error
                );

                return;

            }


            window.location.href =
                "index.html";

        }
    );

}



const adminLogoutBtn =
    document.getElementById(
        "adminLogoutBtn"
    );


if (adminLogoutBtn) {

    adminLogoutBtn.addEventListener(
        "click",
        async () => {

            const {
                error
            } =
                await supabaseClient
                    .auth
                    .signOut();


            if (error) {

                console.error(
                    "Admin logout error:",
                    error
                );

                return;

            }


            window.location.href =
                "admin-login.html";

        }
    );

}




async function getCurrentUser() {

    const {
        data,
        error
    } =
        await supabaseClient
            .auth
            .getUser();


    if (error) {

        console.error(
            "Get user error:",
            error
        );

        return null;

    }


    return data.user;

}




async function getCurrentAdmin() {

    const user =
        await getCurrentUser();


    if (!user) {
        return null;
    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("users")
            .select(
                "id, full_name, username, role"
            )
            .eq(
                "id",
                user.id
            )
            .single();


    if (error) {

        console.error(
            "Admin profile error:",
            error
        );

        return null;

    }


    if (data.role !== "admin") {
        return null;
    }


    return data;

}


async function loadDashboardUser() {

    const welcomeUser =
        document.getElementById(
            "welcomeUser"
        );


    if (!welcomeUser) {
        return;
    }


    const user =
        await getCurrentUser();


    if (!user) {

        window.location.href =
            "index.html";

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("users")
            .select(
                "full_name, username"
            )
            .eq(
                "id",
                user.id
            )
            .single();


    if (error) {

        console.error(
            "Profile error:",
            error
        );

        welcomeUser.textContent =
            "Welcome to HealthDesk!";

        return;

    }


    welcomeUser.textContent =
        `Welcome, ${data.full_name}!`;

}


loadDashboardUser();



const appointmentForm =
    document.getElementById(
        "appointmentForm"
    );


if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const appointmentType =
                document.getElementById(
                    "appointmentType"
                ).value;


            const appointmentDate =
                document.getElementById(
                    "appointmentDate"
                ).value;


            const appointmentTime =
                document.getElementById(
                    "appointmentTime"
                ).value;


            const appointmentReason =
                document.getElementById(
                    "appointmentReason"
                ).value
                .trim();


            const message =
                document.getElementById(
                    "appointmentMessage"
                );


            if (message) {
                message.textContent = "";
            }


            try {

                const user =
                    await getCurrentUser();


                if (!user) {

                    if (message) {

                        message.textContent =
                            "Please log in first.";

                    }


                    setTimeout(
                        () => {

                            window.location.href =
                                "index.html";

                        },
                        1500
                    );

                    return;

                }


                const {
                    error
                } =
                    await supabaseClient
                        .from("appointments")
                        .insert({

                            user_id:
                                user.id,

                            appointment_type:
                                appointmentType,

                            appointment_date:
                                appointmentDate,

                            appointment_time:
                                appointmentTime,

                            reason:
                                appointmentReason,

                            status:
                                "Pending"

                        });


                if (error) {
                    throw error;
                }


                if (message) {

                    message.textContent =
                        "Appointment sent successfully!";

                }


                appointmentForm.reset();


                setTimeout(
                    () => {

                        window.location.href =
                            "appointments.html";

                    },
                    1200
                );


            } catch (error) {

                console.error(
                    "Appointment error:",
                    error
                );


                if (message) {

                    message.textContent =
                        error.message ||
                        "Unable to send appointment.";

                }

            }

        }
    );

}




const appointmentsList =
    document.getElementById(
        "appointmentsList"
    );


if (appointmentsList) {

    loadMyAppointments();

}


async function loadMyAppointments() {

    const loading =
        document.getElementById(
            "appointmentsLoading"
        );


    const message =
        document.getElementById(
            "appointmentsMessage"
        );


    try {

        const user =
            await getCurrentUser();


        if (!user) {

            if (loading) {

                loading.textContent =
                    "Please log in first.";

            }


            setTimeout(
                () => {

                    window.location.href =
                        "index.html";

                },
                1500
            );

            return;

        }


        const {
            data,
            error
        } =
            await supabaseClient
                .from("appointments")
                .select(
                    "id, appointment_type, appointment_date, appointment_time, reason, status, created_at"
                )
                .eq(
                    "user_id",
                    user.id
                )
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );


        if (error) {
            throw error;
        }


        appointmentsList.innerHTML = "";


        if (
            !data ||
            data.length === 0
        ) {

            appointmentsList.innerHTML = `

                <div class="appointment-card">

                    <h3>
                        No Appointments Yet
                    </h3>

                    <p>
                        You have not sent an appointment request.
                    </p>

                </div>

            `;

            return;

        }


        data.forEach(
            appointment => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "appointment-card";


                const formattedDate =
                    formatAppointmentDate(
                        appointment.appointment_date
                    );


                const formattedTime =
                    formatAppointmentTime(
                        appointment.appointment_time
                    );


                card.innerHTML = `

                    <div class="appointment-header">

                        <h3>
                            ${escapeHtml(
                                appointment.appointment_type
                            )}
                            Appointment
                        </h3>

                        <span class="appointment-status">
                            ${escapeHtml(
                                appointment.status
                            )}
                        </span>

                    </div>

                    <p>
                        <strong>Date:</strong>
                        ${formattedDate}
                    </p>

                    <p>
                        <strong>Time:</strong>
                        ${formattedTime}
                    </p>

                    <p>
                        <strong>Reason:</strong>
                        ${escapeHtml(
                            appointment.reason
                        )}
                    </p>

                    ${
                        appointment.status !==
                        "Cancelled"
                        ? `

                            <button
                                type="button"
                                class="cancel-appointment-btn"
                                data-id="${appointment.id}"
                            >
                                Cancel Appointment
                            </button>

                        `
                        : ""
                    }

                `;


                appointmentsList.appendChild(
                    card
                );

            }
        );


        const cancelButtons =
            document.querySelectorAll(
                ".cancel-appointment-btn"
            );


        cancelButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        cancelAppointment(
                            button.dataset.id
                        );

                    }
                );

            }
        );


    } catch (error) {

        console.error(
            "Load appointments error:",
            error
        );


        if (loading) {

            loading.textContent =
                "Unable to load appointments.";

        }


        if (message) {

            message.textContent =
                error.message ||
                "Unable to load appointments.";

        }

    }

}


async function cancelAppointment(
    appointmentId
) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this appointment?"
        );


    if (!confirmCancel) {
        return;
    }


    try {

        const user =
            await getCurrentUser();


        if (!user) {

            window.location.href =
                "index.html";

            return;

        }


        const {
            error
        } =
            await supabaseClient
                .from("appointments")
                .update({
                    status:
                        "Cancelled"
                })
                .eq(
                    "id",
                    appointmentId
                )
                .eq(
                    "user_id",
                    user.id
                );


        if (error) {
            throw error;
        }


        alert(
            "Appointment cancelled successfully."
        );


        loadMyAppointments();


    } catch (error) {

        console.error(
            "Cancel appointment error:",
            error
        );


        alert(
            error.message ||
            "Unable to cancel appointment."
        );

    }

}




function formatAppointmentDate(
    date
) {

    if (!date) {
        return "";
    }


    const parts =
        date.split("-");


    if (parts.length !== 3) {
        return date;
    }


    return `${parts[1]}/${parts[2]}/${parts[0]}`;

}



function formatAppointmentTime(
    time
) {

    if (!time) {
        return "";
    }


    const parts =
        time.split(":");


    if (parts.length < 2) {
        return time;
    }


    let hour =
        parseInt(
            parts[0],
            10
        );


    const minute =
        parts[1];


    const period =
        hour >= 12
            ? "PM"
            : "AM";


    if (hour === 0) {

        hour = 12;

    }
    else if (hour > 12) {

        hour -= 12;

    }


    return `${hour}:${minute} ${period}`;

}



function escapeHtml(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value ?? "";


    return div.innerHTML;

}


const adminTotal =
    document.getElementById(
        "adminTotal"
    );


const adminPending =
    document.getElementById(
        "adminPending"
    );


const adminApproved =
    document.getElementById(
        "adminApproved"
    );


const adminCompleted =
    document.getElementById(
        "adminCompleted"
    );


const adminAppointmentsList =
    document.getElementById(
        "adminAppointmentsList"
    );


if (
    adminTotal ||
    adminPending ||
    adminApproved ||
    adminCompleted ||
    adminAppointmentsList
) {

    loadAdminDashboard();

}


async function loadAdminDashboard() {

    try {

        const admin =
            await getCurrentAdmin();


        if (!admin) {

            window.location.href =
                "admin-login.html";

            return;

        }


        const {
            data,
            error
        } =
            await supabaseClient
                .from("appointments")
                .select(`
                    id,
                    user_id,
                    appointment_type,
                    appointment_date,
                    appointment_time,
                    reason,
                    status,
                    created_at,
                    users (
                        full_name,
                        student_id
                    )
                `)
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );


        if (error) {
            throw error;
        }


        const appointments =
            data || [];


        if (adminTotal) {

            adminTotal.textContent =
                appointments.length;

        }


        if (adminPending) {

            adminPending.textContent =
                appointments.filter(
                    item =>
                        item.status === "Pending"
                ).length;

        }


        if (adminApproved) {

            adminApproved.textContent =
                appointments.filter(
                    item =>
                        item.status === "Approved"
                ).length;

        }


        if (adminCompleted) {

            adminCompleted.textContent =
                appointments.filter(
                    item =>
                        item.status === "Completed"
                ).length;

        }


        if (!adminAppointmentsList) {
            return;
        }


        adminAppointmentsList.innerHTML = "";


        if (appointments.length === 0) {

            adminAppointmentsList.innerHTML = `

                <div class="appointment-card">

                    <h3>
                        No Appointments
                    </h3>

                    <p>
                        No appointment requests have been submitted.
                    </p>

                </div>

            `;

            return;

        }


        appointments.forEach(
            appointment => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "appointment-card";


                let userProfile =
                    appointment.users;


                if (
                    Array.isArray(
                        userProfile
                    )
                ) {

                    userProfile =
                        userProfile[0];

                }


                const fullName =
                    userProfile &&
                    userProfile.full_name
                        ? userProfile.full_name
                        : "Unknown Student";


                const studentId =
                    userProfile &&
                    userProfile.student_id
                        ? userProfile.student_id
                        : "No Student ID";


                const formattedDate =
                    formatAppointmentDate(
                        appointment.appointment_date
                    );


                const formattedTime =
                    formatAppointmentTime(
                        appointment.appointment_time
                    );


                card.innerHTML = `

                    <div
                        class="appointment-user"
                        style="
                            margin-bottom: 15px;
                            padding-bottom: 12px;
                            border-bottom: 1px solid #e5e5e5;
                        "
                    >

                        <strong
                            style="
                                display: block;
                                font-size: 17px;
                                margin-bottom: 4px;
                            "
                        >
                            ${escapeHtml(
                                fullName
                            )}
                        </strong>

                        <span
                            style="
                                font-size: 14px;
                                color: #666;
                            "
                        >
                            Student ID:
                            ${escapeHtml(
                                studentId
                            )}
                        </span>

                    </div>


                    <div class="appointment-header">

                        <h3>
                            ${escapeHtml(
                                appointment.appointment_type
                            )}
                            Appointment
                        </h3>

                        <span class="appointment-status">
                            ${escapeHtml(
                                appointment.status
                            )}
                        </span>

                    </div>


                    <p>
                        <strong>Date:</strong>
                        ${formattedDate}
                    </p>


                    <p>
                        <strong>Time:</strong>
                        ${formattedTime}
                    </p>


                    <p>
                        <strong>Reason:</strong>
                        ${escapeHtml(
                            appointment.reason
                        )}
                    </p>


                    <div class="admin-actions">

                        <button
                            type="button"
                            class="admin-status-btn"
                            data-id="${appointment.id}"
                            data-status="Approved"
                        >
                            Approve
                        </button>


                        <button
                            type="button"
                            class="admin-status-btn"
                            data-id="${appointment.id}"
                            data-status="Rejected"
                        >
                            Reject
                        </button>


                        <button
                            type="button"
                            class="admin-status-btn"
                            data-id="${appointment.id}"
                            data-status="Completed"
                        >
                            Complete
                        </button>

                    </div>

                `;


                adminAppointmentsList.appendChild(
                    card
                );

            }
        );


        const statusButtons =
            document.querySelectorAll(
                ".admin-status-btn"
            );


        statusButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        updateAppointmentStatus(
                            button.dataset.id,
                            button.dataset.status
                        );

                    }
                );

            }
        );


    } catch (error) {

        console.error(
            "Admin dashboard error:",
            error
        );


        if (adminAppointmentsList) {

            adminAppointmentsList.innerHTML = `

                <div class="appointment-card">

                    <h3>
                        Unable to load appointments
                    </h3>

                    <p>
                        ${escapeHtml(
                            error.message ||
                            "Something went wrong."
                        )}
                    </p>

                </div>

            `;

        }

    }

}




async function updateAppointmentStatus(
    appointmentId,
    newStatus
) {

    try {

        const admin =
            await getCurrentAdmin();


        if (!admin) {

            window.location.href =
                "admin-login.html";

            return;

        }


        const {
            error
        } =
            await supabaseClient
                .from("appointments")
                .update({
                    status:
                        newStatus
                })
                .eq(
                    "id",
                    appointmentId
                );


        if (error) {
            throw error;
        }


        alert(
            "Appointment status updated to " +
            newStatus + "."
        );


        loadAdminDashboard();


    } catch (error) {

        console.error(
            "Update appointment status error:",
            error
        );


        alert(
            error.message ||
            "Unable to update appointment."
        );

    }

}



let deferredPrompt = null;


const installBtn =
    document.getElementById(
        "installBtn"
    );


const downloadOverlay =
    document.getElementById(
        "downloadOverlay"
    );


const downloadMessage =
    document.getElementById(
        "downloadMessage"
    );


const downloadCountdown =
    document.getElementById(
        "downloadCountdown"
    );


const downloadProgressBar =
    document.getElementById(
        "downloadProgressBar"
    );



function isHealthDeskInstalled() {

    return (

        window.matchMedia(
            "(display-mode: standalone)"
        ).matches

        ||

        window.navigator.standalone === true

    );

}



function createInstallButton() {

    if (!downloadOverlay) {
        return null;
    }


    let button =
        document.getElementById(
            "installHealthDeskBtn"
        );


    if (button) {
        return button;
    }


    button =
        document.createElement(
            "button"
        );


    button.id =
        "installHealthDeskBtn";


    button.type =
        "button";


    button.textContent =
        "📱 Install HealthDesk";


    button.className =
        "install-healthdesk-btn";


    button.style.display =
        "none";


    button.style.marginTop =
        "18px";


    button.style.padding =
        "12px 22px";


    button.style.border =
        "none";


    button.style.borderRadius =
        "10px";


    button.style.background =
        "#2e8b57";


    button.style.color =
        "#ffffff";


    button.style.fontSize =
        "16px";


    button.style.fontWeight =
        "600";


    button.style.cursor =
        "pointer";


    const downloadBox =
        downloadOverlay.querySelector(
            ".download-box"
        );


    if (downloadBox) {

        downloadBox.appendChild(
            button
        );

    }


    return button;

}

window.addEventListener(
    "beforeinstallprompt",
    event => {

        console.log(
            "Chrome install prompt is available."
        );


        event.preventDefault();


        deferredPrompt =
            event;


        if (installBtn) {

            installBtn.classList.remove(
                "hidden"
            );

        }

    }
);




async function installHealthDesk() {

    if (
        isHealthDeskInstalled()
    ) {

        console.log(
            "HealthDesk is already installed."
        );

        return;

    }


    if (deferredPrompt) {

        console.log(
            "Opening Chrome installation prompt..."
        );


        deferredPrompt.prompt();


        const result =
            await deferredPrompt.userChoice;


        console.log(
            "Chrome install result:",
            result.outcome
        );


        deferredPrompt =
            null;


        return;

    }



    alert(
        "Chrome is not providing the automatic install button right now.\n\n" +
        "Open the Chrome menu ⋮ and choose " +
        "'Install HealthDesk' or 'Add to Home screen'."
    );

}



if (installBtn) {

    installBtn.addEventListener(
        "click",
        async () => {

            if (
                isHealthDeskInstalled()
            ) {

                return;

            }


            if (!downloadOverlay) {

                await installHealthDesk();

                return;

            }



            downloadOverlay
                .classList
                .remove("hidden");


            if (downloadMessage) {

                downloadMessage.textContent =
                    "Preparing HealthDesk...";

            }


            if (downloadCountdown) {

                downloadCountdown.textContent =
                    "5";

            }


            if (downloadProgressBar) {

                downloadProgressBar.style.width =
                    "0%";

            }


            const installHealthDeskBtn =
                createInstallButton();


            if (installHealthDeskBtn) {

                installHealthDeskBtn.style.display =
                    "none";

            }


 
            let seconds = 5;


            await new Promise(
                resolve => {

                    const timer =
                        setInterval(
                            () => {

                                seconds--;


                                if (
                                    downloadCountdown
                                ) {

                                    downloadCountdown.textContent =
                                        seconds;
                                }


                                const progress =
                                    (
                                        (5 - seconds)
                                        / 5
                                    ) * 100;


                                if (
                                    downloadProgressBar
                                ) {

                                    downloadProgressBar.style.width =
                                        progress + "%";

                                }


                                if (
                                    seconds <= 0
                                ) {

                                    clearInterval(
                                        timer
                                    );

                                    resolve();

                                }

                            },
                            1000
                        );

                }
            );


            if (downloadMessage) {

                if (deferredPrompt) {

                    downloadMessage.textContent =
                        "HealthDesk is ready to install!";

                }
                else {

                    downloadMessage.textContent =
                        "HealthDesk is ready!";

                }

            }

            if (installHealthDeskBtn) {

                installHealthDeskBtn.style.display =
                    "inline-block";

            }

        }
    );

}


document.addEventListener(
    "click",
    async event => {

        if (
            event.target &&
            event.target.id ===
                "installHealthDeskBtn"
        ) {

            event.target.disabled =
                true;


            event.target.textContent =
                "Opening Chrome...";


            await installHealthDesk();


            event.target.disabled =
                false;


            event.target.textContent =
                "📱 Install HealthDesk";

        }

    }
);


window.addEventListener(
    "appinstalled",
    () => {

        console.log(
            "HealthDesk installed successfully."
        );


        deferredPrompt =
            null;


        if (downloadMessage) {

            downloadMessage.textContent =
                "HealthDesk has been installed!";

        }


        const installHealthDeskBtn =
            document.getElementById(
                "installHealthDeskBtn"
            );


        if (installHealthDeskBtn) {

            installHealthDeskBtn.style.display =
                "none";

        }

    }
);



if (
    isHealthDeskInstalled()
) {

    console.log(
        "HealthDesk is running as an installed app."
    );

}
else {

    console.log(
        "HealthDesk is running in the browser."
    );

}