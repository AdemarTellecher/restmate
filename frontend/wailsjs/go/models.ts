export namespace main {
	
	export class FormData {
	    id: string;
	    key: string;
	    value: string;
	    type: string;
	    active: boolean;
	
	    static createFrom(source: any = {}) {
	        return new FormData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.key = source["key"];
	        this.value = source["value"];
	        this.type = source["type"];
	        this.active = source["active"];
	    }
	}
	export class Body {
	    bodyType: string;
	    bodyRaw: string;
	    formData: FormData[];
	
	    static createFrom(source: any = {}) {
	        return new Body(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.bodyType = source["bodyType"];
	        this.bodyRaw = source["bodyRaw"];
	        this.formData = this.convertValues(source["formData"], FormData);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class KeyValue {
	    id: string;
	    key: string;
	    value: string;
	    active: boolean;
	
	    static createFrom(source: any = {}) {
	        return new KeyValue(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.key = source["key"];
	        this.value = source["value"];
	        this.active = source["active"];
	    }
	}
	export class Request {
	    id: string;
	    name: string;
	    url: string;
	    method: string;
	    headers: KeyValue[];
	    params: KeyValue[];
	    body: Body;
	    coll_id: string;
	
	    static createFrom(source: any = {}) {
	        return new Request(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.url = source["url"];
	        this.method = source["method"];
	        this.headers = this.convertValues(source["headers"], KeyValue);
	        this.params = this.convertValues(source["params"], KeyValue);
	        this.body = this.convertValues(source["body"], Body);
	        this.coll_id = source["coll_id"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Rsp {
	    success: boolean;
	    msg: string;
	
	    static createFrom(source: any = {}) {
	        return new Rsp(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.success = source["success"];
	        this.msg = source["msg"];
	    }
	}

}

