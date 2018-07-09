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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/Logger","../../support/geometryUtils","../lib/ComponentUtils","../lib/DefaultVertexBufferLayouts","../lib/gl-matrix","../lib/GLMaterial","../lib/Material","../lib/RenderSlot","../lib/Util","./internal/MaterialUtil","../../../webgl/Util"],function(e,t,r,n,o,a,i,c,s,p,l,d,u,f){var v=d.VertexAttrConstants,g=i.Pos3,m=f.getStride(g)/4,h={color:[1,1,1,1]},y=n.getLogger("esri.views.3d.webgl-engine.materials.NativeLineMaterial"),b=function(e){function t(t,r){var n=e.call(this,r)||this;return n.params=u.copyParameters(t,h),n.canBeMerged=!0,n}return r(t,e),t.prototype.setColor=function(e){this.params.color=e,this.notifyDirty("matChanged")},t.prototype.getColor=function(){return this.params.color},t.prototype.getParameterValues=function(){return{color:this.params.color}},t.prototype.getOutputAmount=function(e){return e*m},t.prototype.getInstanceBufferLayout=function(){},t.prototype.getVertexBufferLayout=function(){return g},t.prototype.fillInterleaved=function(e,t,r,n,o,a,i){var c=e.vertexAttr[v.POSITION].data;if(t){var s=c;c=B;for(var p=0;p<s.length;p+=3){var l=s[p],d=s[p+1],u=s[p+2];c[p]=t[0]*l+t[4]*d+t[8]*u+t[12],c[p+1]=t[1]*l+t[5]*d+t[9]*u+t[13],c[p+2]=t[2]*l+t[6]*d+t[10]*u+t[14]}}for(var f=e.indices[v.POSITION],g=a,p=0;p<f.length;p++){var m=3*f[p];o[g++]=c[m],o[g++]=c[m+1],o[g++]=c[m+2]}},t.prototype.intersect=function(e,t,r,n,i,s,p,l){if(n.isSelection&&!a.isAllHidden(t.componentVisibilities,e.data.componentOffsets)){if(!d.isTranslationMatrix(r))return void y.error("intersection assumes a translation-only matrix");var u=e.getData().getVertexAttr().position.data,f=n.camera,v=n.point;c.vec3d.set3(v[0]-2,v[1]+2,0,N[0]),c.vec3d.set3(v[0]+2,v[1]+2,0,N[1]),c.vec3d.set3(v[0]+2,v[1]-2,0,N[2]),c.vec3d.set3(v[0]-2,v[1]-2,0,N[3]);for(var g=0;g<4;g++)f.unprojectPoint(N[g],D[g]);o.plane.fromPoints(f.eye,D[0],D[1],O),o.plane.fromPoints(f.eye,D[1],D[2],_),o.plane.fromPoints(f.eye,D[2],D[3],C),o.plane.fromPoints(f.eye,D[3],D[0],T);for(var m=Number.MAX_VALUE,g=0;g<u.length-5;g+=3)if(S[0]=u[g]+r[12],S[1]=u[g+1]+r[13],S[2]=u[g+2]+r[14],L[0]=u[g+3]+r[12],L[1]=u[g+4]+r[13],L[2]=u[g+5]+r[14],!(o.plane.distance(O,S)<0&&o.plane.distance(O,L)<0||o.plane.distance(_,S)<0&&o.plane.distance(_,L)<0||o.plane.distance(C,S)<0&&o.plane.distance(C,L)<0||o.plane.distance(T,S)<0&&o.plane.distance(T,L)<0)){if(f.projectPoint(S,I),f.projectPoint(L,U),I[2]<0&&U[2]>0){c.vec3d.subtract(S,L,M);var h=f.frustumPlanes,b=-o.plane.distance(h[4],S),P=b/c.vec3d.dot(M,h[4]);c.vec3d.scale(M,P,M),c.vec3d.add(S,M,S),f.projectPoint(S,I)}else if(I[2]>0&&U[2]<0){c.vec3d.subtract(L,S,M);var h=f.frustumPlanes,b=-o.plane.distance(h[4],L),P=b/c.vec3d.dot(M,h[4]);c.vec3d.scale(M,P,M),c.vec3d.add(L,M,L),f.projectPoint(L,U)}else if(I[2]<0&&U[2]<0)continue;var A=d.pointLineSegmentDistanceSquared2D(I,U,v);A<m&&(m=A,c.vec3d.set(S,x),c.vec3d.set(L,V))}var B=n.p0,R=n.p1;if(m<4){var j=d.lineLineDistanceSquared3D(x,V,B,R,w),H=Number.MAX_VALUE;if(j.success){c.vec3d.subtract(j.pa,B,E);var q=c.vec3d.length(E);c.vec3d.scale(E,1/q),H=q/c.vec3d.dist(B,R)}p(H,E)}}},t.prototype.getGLMaterials=function(){return{color:P,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:A}},t.prototype.getAllTextureIds=function(){return[]},t}(p),P=function(e){function t(t,r,n){var o=e.call(this,t,r)||this;return o.program=r.get("simple"),o.updateParameters(),o}return r(t,e),t.prototype.updateParameters=function(){this.params=this.material.getParameterValues()},t.prototype.beginSlot=function(e){return e===l.OPAQUE_MATERIAL},t.prototype.getProgram=function(){return this.program},t.prototype.bind=function(e,t){var r=this.program,n=this.params;e.bindProgram(r),r.setUniform4fv("color",n.color),e.setBlendingEnabled(n.color[3]<1),e.setBlendFunctionSeparate(e.gl.SRC_ALPHA,e.gl.ONE_MINUS_SRC_ALPHA,e.gl.ONE,e.gl.ONE_MINUS_SRC_ALPHA),e.setDepthTestEnabled(!0)},t.prototype.release=function(e){this.params.color[3]<1&&e.setBlendingEnabled(!1)},t.prototype.bindView=function(e,t){u.bindView(t.origin,t.view,this.program)},t.prototype.bindInstance=function(e,t){this.program.setUniformMatrix4fv("model",t.transformation)},t.prototype.getDrawMode=function(e){return e.gl.LINES},t}(s),A=function(e){function t(t,r,n){var o=e.call(this,t,r)||this;return o.program=r.get("highlight"),o}return r(t,e),t.prototype.updateParameters=function(){},t.prototype.beginSlot=function(e){return e===l.OPAQUE_MATERIAL},t.prototype.getProgram=function(){return this.program},t.prototype.bind=function(e,t){e.bindProgram(this.program),e.setDepthTestEnabled(!0)},t.prototype.release=function(e){},t.prototype.bindView=function(e,t){u.bindView(t.origin,t.view,this.program)},t.prototype.bindInstance=function(e,t){this.program.setUniformMatrix4fv("model",t.transformation)},t.prototype.getDrawMode=function(e){return e.gl.LINES},t}(s),S=c.vec3d.create(),L=c.vec3d.create(),M=c.vec3d.create(),E=c.vec3d.create(),I=c.vec3d.create(),U=c.vec3d.create(),x=c.vec3d.create(),V=c.vec3d.create(),w={success:!1,dist2:0,pa:c.vec3d.create(),pb:c.vec3d.create()},N=[c.vec3d.create(),c.vec3d.create(),c.vec3d.create(),c.vec3d.create()],D=[c.vec3d.create(),c.vec3d.create(),c.vec3d.create(),c.vec3d.create()],O=o.plane.create(),_=o.plane.create(),C=o.plane.create(),T=o.plane.create(),B=[];return b});