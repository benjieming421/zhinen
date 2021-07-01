import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [{
		path: "/",
		name: "Home",
		// redirect: { name: "Sources" },
		component: resolve => require(["@/views/Home.vue"], resolve),
		children: [{
				path: "course/:name",
				name: "Course",
				component: resolve => require(["@/views/user/Courses.vue"], resolve)
			},
			{
				path: "feedback",
				name: "FeedBack",
				component: resolve => require(["@/views/user/FeedBack.vue"], resolve)
			},
			{
				path: "plan",
				name: "Plan",
				component: resolve => require(["@/views/user/Plan.vue"], resolve)
			},
			{
				path: "resource",  //4   ---
				name: "Resource",
				component: resolve => require(["@/views/manager/Resource.vue"], resolve)
			},
			{
				path: "learn",  //2 
				name: "Learn",
				component: resolve => require(["@/views/manager/Learn.vue"], resolve)
			},
			{
				path: "calendar", //3
				name: "Calendar",
				component: resolve => require(["@/views/manager/Calendar.vue"], resolve)
			},
			{
				path: "administrator",  //1
				name: "Administrator",
				component: resolve =>
					require(["@/views/manager/Administrators.vue"], resolve)
			},
			{
				path: "welcome",
				name: "Welcome",
				component: resolve => require(["@/views/manager/Welcome.vue"], resolve)
			},
			{
				path: "opinion",  //5
				name: "Opinion",
				component: resolve => require(["@/views/manager/Opinion.vue"], resolve)
			},
			{
				path: "customer",   //6
				name: "Customer",
				component: resolve => require(["@/views/manager/User.vue"], resolve)
			}
		]
	},
	{
		path: "/user",
		name: "User",
		component: () => import("../views/user/index.vue"),
		default: "UserLogin",
		children: [{
				path: "login",  //8
				name: "UserLogin",
				component: () => import("../views/user/Login.vue")
			},
			{
				path: "register",  //7
				name: "Register",
				component: () => import("../views/user/Register.vue")
			},
			{
				path: "tourists",  //7
				name: "Tourists",
				component: () => import("../views/user/Tourists.vue")
			},
			{
				path: "videos",  //7
				name: "Videos",
				component: () => import("../views/user/Videos.vue")
			},
			{
				path: "forgotpwd",  //7
				name: "Forgotpwd",
				component: () => import("../views/user/Forgotpwd.vue")
			},
			{
				path: "personal",  //7
				name: "Personal",
				component: () => import("../views/user/Personal.vue")
			},
		]
	},
	{
		path: "/manager",
		name: "Manager",
		component: () => import("../views/manager/Login.vue"),
		default: "ManagerLogin",
		children: [{
			path: "login",  //9
			name: "ManagerLogin",
			component: () => import("../views/manager/Login.vue")
		}]
	}
];

const router = new VueRouter({
	routes
});

export default router;
