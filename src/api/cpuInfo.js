import request from '@/utils/request'

export function getCpuInfo(params) {
	return request({
		url: '/realtime-monitor/monitor/system/cpuInfo',
		method: 'get',
		params,
		baseURL: 'http://10.11.42.203:88/api'
	})
}

export function getWebsocket() {
	const ws = new WebSocket("ws://192.168.125.123:8083/websocket/1")
	ws.onopen = e => {
		console.log(e);
	}
	ws.onmessage = function (e) {
		console.log(e.data);
	}
}