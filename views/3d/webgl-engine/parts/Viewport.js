// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["require","exports","dojo/has","../../support/geometryUtils","../lib/Camera","../lib/gl-matrix","../lib/PerformanceTimer","../lib/Util","./Visualizer"],function(e,t,r,i,s,a,n,o,u){var m=2e4,d=[0,0],l=a.mat4d.create(),h=[i.plane.create(),i.plane.create(),i.plane.create(),i.plane.create(),i.plane.create(),i.plane.create()],_=r("dojo-debug-messages");return function(){function e(e,t,r,i,o){this._content=new Map,this._frustumCullingEnabled=!0,this._maxFarNearRatio=m,this._stats={renderGeometriesTotal:0,renderGeometriesVisible:0,visualizerRenderTimer:null,viewportRenderTimer:null},this._needsRender=!0,this._rctx=o,this._gl=o.gl,this._visualizer=new u(e,t,r,i,this._rctx),this._camera=new s(a.vec3.createFrom(0,100,-100),a.vec3.createFrom(0,0,0)),_&&(this._stats.visualizerRenderTimer=new n(10),this._stats.viewportRenderTimer=new n(10))}return Object.defineProperty(e.prototype,"isLoadingResources",{get:function(){return this._visualizer.isLoadingResources},enumerable:!0,configurable:!0}),e.prototype.getCombinedStats=function(){var e={},t=this._visualizer.getCombinedStats();for(var r in t)e[r]=t[r];if(e.renderGeometriesTotal=this._stats.renderGeometriesTotal,e.renderGeometriesVisible=this._stats.renderGeometriesVisible,_&&(e.visualizerTotalRenderTime=this._stats.visualizerRenderTimer.getTotal(),e.visualizerCurrentRenderTime=this._stats.visualizerRenderTimer.getLastFiltered(),e.viewportTotalRenderTime=this._stats.viewportRenderTimer.getTotal(),e.viewportCurrentRenderTime=this._stats.viewportRenderTimer.getLastFiltered(),e.totalNumFramesRendered=this._stats.viewportRenderTimer.getNumMeasurements()),void 0!==this._gl.getUsedTextureMemory&&(e.textureMemory=this._gl.getUsedTextureMemory()),void 0!==this._gl.getUsedRenderbufferMemory&&(e.renderbufferMemory=this._gl.getUsedRenderbufferMemory()),void 0!==this._gl.getUsedVBOMemory&&(e.VBOMemory=this._gl.getUsedVBOMemory()),void 0!==this._gl.getUsedTextureMemoryStats){var i=this._gl.getUsedTextureMemoryStats();for(var s in i)e["texMem type: "+s]=i[s]}return e},e.prototype.dispose=function(){this._visualizer.dispose(),this._visualizer=null},e.prototype.setLighting=function(e){this._visualizer.setLighting(e)},e.prototype.getViewParams=function(e){var t=this._visualizer.getViewParams(e);return e&&!e.frustumCullingEnabled||(t.frustumCullingEnabled=this._frustumCullingEnabled),e&&!e.maxFarNearRatio||(t.maxFarNearRatio=this._maxFarNearRatio),t},e.prototype.setViewParams=function(e){void 0!==e.frustumCullingEnabled&&(this._frustumCullingEnabled=e.frustumCullingEnabled),void 0!==e.maxFarNearRatio&&(-1===e.maxFarNearRatio?this._maxFarNearRatio=m:this._maxFarNearRatio=e.maxFarNearRatio),this._visualizer.setViewParams(e),this._needsRender=!0},e.prototype.setRenderParams=function(e){this._visualizer.setRenderParams(e)},e.prototype.getRenderParams=function(){return this._visualizer.getRenderParams()},e.prototype.getEdgeView=function(){return this._visualizer.getEdgeView()},e.prototype.modify=function(e,t,r,i){this._visualizer.modify(e,t,r,i),this._content=this._visualizer.getContent()},e.prototype.getContent=function(){return this._content},e.prototype.setCamera=function(e){this._camera.copyFrom(e),this._updateNearFar(),this._needsRender=!0},e.prototype.getCamera=function(){return this._camera},e.prototype.getPickRay=function(e,t,r){return this.pickRayWithBeginPoint(e,void 0,this._camera.viewMatrix,t,r)},e.prototype.pickRayWithBeginPoint=function(e,t,r,i,s){return this._visualizer.getPickRay(e,t,this._camera,r,i,s)},e.prototype.addExternalRenderer=function(e,t){return this._visualizer.addExternalRenderer(e,t)},e.prototype.removeExternalRenderer=function(e){return this._visualizer.removeExternalRenderer(e)},e.prototype.getExternalRenderers=function(){return this._visualizer.getExternalRenderers()},e.prototype.render=function(e,t){_&&this._stats.viewportRenderTimer.start(),this._updateNearFar(),_&&this._stats.visualizerRenderTimer.start(),this._visualizer.render(this._camera,e,t),_&&(this._stats.visualizerRenderTimer.stop(),this._stats.viewportRenderTimer.stop())},e.prototype.resetNeedsRender=function(){this._needsRender=!1,this._visualizer.resetNeedsRender()},e.prototype.needsRender=function(){return this._needsRender||this._visualizer.needsRender()},e.prototype._updateNearFar=function(){(this._frustumCullingEnabled||this._maxFarNearRatio>0)&&(d[1]=0,this._computeFrustumCullingAndNearFar(this._camera.eye,d),this._maxFarNearRatio>0&&d[1]>0&&(this._camera.far=d[1],this._camera.near=Math.max(d[0],this._camera.far/this._maxFarNearRatio)))},e.prototype._computeFrustumCullingAndNearFar=function(e,t){var r=this;a.mat4d.perspective(this._camera.fovY,this._camera.aspect,1,10,l),o.matrixToFrustumPlanes(this._camera.viewMatrix,l,h),this._stats.renderGeometriesTotal=0,this._stats.renderGeometriesVisible=0;var i=-Number.MAX_VALUE,s=-Number.MAX_VALUE,n=h[0][0],u=h[0][1],m=h[0][2],d=h[0][3],_=h[1][0],p=h[1][1],c=h[1][2],g=h[1][3],v=h[2][0],R=h[2][1],f=h[2][2],y=h[2][3],x=h[3][0],T=h[3][1],b=h[3][2],z=h[3][3],F=h[4][0],N=h[4][1],w=h[4][2],M=h[4][3],E=h[5][3];this._content.forEach(function(e){r._stats.renderGeometriesTotal++;var t=e.center,a=t[0],o=t[1],l=t[2],h=e.bsRadius;if(!(n*a+u*o+m*l+d>h||_*a+p*o+c*l+g>h||v*a+R*o+f*l+y>h||x*a+T*o+b*l+z>h)){var M=F*a+N*o+w*l,E=M+h,C=-M+h;E>i&&(i=E),C>s&&(s=C),r._stats.renderGeometriesVisible++}});var C=i!==-Number.MAX_VALUE;i+=M,s+=E,this._stats.renderGeometriesVisible>0&&C&&(t[0]=.99*Math.max(1-i,2),t[1]=1.01*Math.max(10+s,t[0]+1))},e}()});