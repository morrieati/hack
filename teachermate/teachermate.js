#!/usr/bin/env node
var request = require('request').defaults({ jar: true });

function checkin() {
	request.post({
		url: 'https://www.teachermate.com.cn/wechat/wechat/legacy/student/sign_in',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H143 MicroMessenger/6.2.3 NetType/WIFI Language/zh_CN',
			'Cookie': 'wx_csrf_cookie='
		},
		form: {
			'openid': 'oXygDt6XNpPI3MvVinBt7rRlrdTs',
			'course_id': '3850', // Zuyuan
			// 'course_id': '7046', // Test
			'lon': '0',
			'lat': '0',
			'wx_csrf_name': ''
		}
	},
		(error, response, body) => {
			if (!error && response.statusCode == 200) {
				var msg = JSON.parse(body).msg;
				if (msg == "sign in success") {
					console.log(msg + " and you got " + JSON.parse(body).data.sign_rank + " place");
					return;
				} else {
					console.log(msg);
					checkin();
				}
			} else {
				console.log(response);
			}
		}
	);
}

checkin();
