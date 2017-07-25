var kontra=function(t){"use strict";return t.pool=function(e){var i=Object.create(t.pool.prototype);return i._init(e),i},t.pool.prototype={_init:function(e){e=e||{};var i,s;if("function"!=typeof e.create)return i=new SyntaxError("Required function not found."),void t._logError(i,"Parameter 'create' must be a function that returns an object.");if(this.create=e.create.bind(this,e.createProperties||{}),s=this.create(),!s||"function"!=typeof s.render||"function"!=typeof s.update||"function"!=typeof s.init||"function"!=typeof s.isAlive)return i=new SyntaxError("Create object required functions not found."),void t._logError(i,"Objects to be pooled must implement render(), update(), init() and isAlive() functions.");if(this.objects=[s],this.size=1,this.maxSize=e.maxSize||1/0,this.lastIndex=0,this.inUse=0,e.fill){if(!e.maxSize)return i=new SyntaxError("Required property not found."),void t._logError(i,"Parameter 'maxSize' must be set before you can fill a pool.");for(;this.objects.length<this.maxSize;)this.objects.unshift(this.create());this.size=this.maxSize,this.lastIndex=this.maxSize-1}},get:function(t){if(t=t||{},this.objects[0].isAlive()){if(this.size===this.maxSize)return;for(var e=0;e<this.size&&this.objects.length<this.maxSize;e++)this.objects.unshift(this.create());this.size=this.objects.length,this.lastIndex=this.size-1}var i=this.objects[0];i.init(t);for(var s=1;s<this.size;s++)this.objects[s-1]=this.objects[s];this.objects[this.lastIndex]=i,this.inUse++},getAliveObjects:function(){return this.objects.slice(this.objects.length-this.inUse)},clear:function(){this.inUse=0,this.size=1,this.lastIndex=0,this.objects.length=0,this.objects.push(this.create())},update:function(t){for(var e,i=this.lastIndex,s=Math.max(this.objects.length-this.inUse,0);i>=s;)if(e=this.objects[i],e.update(t),e.isAlive())i--;else{for(var n=i;n>0;n--)this.objects[n]=this.objects[n-1];this.objects[0]=e,this.inUse--,s++}},render:function(){for(var t=Math.max(this.objects.length-this.inUse,0),e=this.lastIndex;e>=t;e--)this.objects[e].render()}},t}(kontra||{});