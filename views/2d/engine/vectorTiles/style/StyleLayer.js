// COPYRIGHT © 2019 Esri
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
// See http://js.arcgis.com/4.14/esri/copyright.txt for details.

define(["require","exports","../../../../../core/tsSupport/extendsHelper","./Filter","./StyleDefinition","./StyleProperty","../../webgl/definitions"],function(t,i,e,a,n,r,o){Object.defineProperty(i,"__esModule",{value:!0});var l=function(){function t(t,i,e){switch(this.type=t,this.typeName=i.type,this.id=i.id,this.source=i.source,this.sourceLayer=i["source-layer"],this.minzoom=i.minzoom,this.maxzoom=i.maxzoom,this.filter=i.filter,this.layout=i.layout,this.paint=i.paint,this.z=e,t){case 0:this._layoutDefinition=n.StyleDefinition.backgroundLayoutDefinition,this._paintDefinition=n.StyleDefinition.backgroundPaintDefinition;break;case 1:this._layoutDefinition=n.StyleDefinition.fillLayoutDefinition,this._paintDefinition=n.StyleDefinition.fillPaintDefinition;break;case 2:this._layoutDefinition=n.StyleDefinition.lineLayoutDefinition,this._paintDefinition=n.StyleDefinition.linePaintDefinition;break;case 3:this._layoutDefinition=n.StyleDefinition.symbolLayoutDefinition,this._paintDefinition=n.StyleDefinition.symbolPaintDefinition;break;case 4:this._layoutDefinition=n.StyleDefinition.circleLayoutDefinition,this._paintDefinition=n.StyleDefinition.circlePaintDefinition}this._layoutProperties=this._parseLayout(this.layout),this._paintProperties=this._parsePaint(this.paint)}return t.prototype.getFeatureFilter=function(){return void 0!==this._featureFilter?this._featureFilter:this._featureFilter=a.createFilter(this.filter)},t.prototype.getLayoutProperty=function(t){var i=this._layoutProperties;if(i)return i[t]},t.prototype.getPaintProperty=function(t){var i=this._paintProperties;if(i)return i[t]},t.prototype.getLayoutValue=function(t,i,e){var a,n=this._layoutProperties;if(n){var r=n[t];r&&(a=r.getValue(i,e))}var o=this._layoutDefinition[t];return void 0===a&&(a=o.default),"enum"===o.type&&(a=o.values.indexOf(a)),a},t.prototype.getPaintValue=function(t,i,e){var a,n=this._paintProperties;if(n){var r=n[t];r&&(a=r.getValue(i,e))}var o=this._paintDefinition[t];return void 0===a&&(a=o.default),"enum"===o.type&&(a=o.values.indexOf(a)),a},t.prototype.isPainterDataDriven=function(){var t=this._paintProperties;if(t)for(var i in t)if(t[i].isDataDriven)return!0;return!1},t.prototype._parseLayout=function(t){var i={};for(var e in t){var a=this._layoutDefinition[e];a&&(i[e]=new r(a,t[e]))}return i},t.prototype._parsePaint=function(t){var i={};for(var e in t){var a=this._paintDefinition[e];a&&(i[e]=new r(a,t[e]))}return i},t}();i.StyleLayer=l;var s=function(t){function i(i,e,a){return t.call(this,i,e,a)||this}return e(i,t),i}(l);i.BackgroundStyleLayer=s;var u=function(t){function i(i,e,a){var n=t.call(this,i,e,a)||this,r=n.getPaintProperty("fill-color");n.hasDataDrivenColor=!!r&&r.isDataDriven;var o=n.getPaintProperty("fill-opacity");n.hasDataDrivenOpacity=!!o&&o.isDataDriven,n.hasDataDrivenFill=n.hasDataDrivenColor||n.hasDataDrivenOpacity;var l=n.getPaintProperty("fill-outline-color");return n.outlineUsesFillColor=!l,n.hasDataDrivenOutlineColor=!!l&&l.isDataDriven,n.hasDataDrivenOutline=(l?n.hasDataDrivenOutlineColor:n.hasDataDrivenColor)||n.hasDataDrivenOpacity,n}return e(i,t),i}(l);i.FillStyleLayer=u;var D=function(t){function i(i,e,a){var r=t.call(this,i,e,a)||this,l=r.getPaintProperty("line-color");r.hasDataDrivenColor=!!l&&l.isDataDriven;var s=r.getPaintProperty("line-opacity");r.hasDataDrivenOpacity=!!s&&s.isDataDriven;var u=r.getPaintProperty("line-width");r.hasDataDrivenWidth=!!u&&u.isDataDriven,r.hasDataDrivenLine=r.hasDataDrivenColor||r.hasDataDrivenOpacity||r.hasDataDrivenWidth;var D=e.paint["line-width"];return D||(D=n.StyleDefinition.linePaintDefinition["line-width"].default),r.isThinLine=!r.hasDataDrivenWidth&&"number"==typeof D&&D<o.THIN_LINE_THRESHOLD,r}return e(i,t),i}(l);i.LineStyleLayer=D;var h=function(t){function i(i,e,a){var n=t.call(this,i,e,a)||this,r=n.getPaintProperty("icon-color");n.hasDataDrivenIconColor=!!r&&r.isDataDriven;var o=n.getPaintProperty("icon-opacity");n.hasDataDrivenIconOpacity=!!o&&o.isDataDriven;var l=n.getLayoutProperty("icon-size");n.hasDataDrivenIconSize=!!l&&l.isDataDriven,n.hasDataDrivenIcon=n.hasDataDrivenIconColor||n.hasDataDrivenIconOpacity||n.hasDataDrivenIconSize;var s=n.getPaintProperty("text-color");n.hasDataDrivenTextColor=!!s&&s.isDataDriven;var u=n.getPaintProperty("text-opacity");n.hasDataDrivenTextOpacity=!!u&&u.isDataDriven;var D=n.getLayoutProperty("text-size");return n.hasDataDrivenTextSize=!!D&&D.isDataDriven,n.hasDataDrivenText=n.hasDataDrivenTextColor||n.hasDataDrivenTextOpacity||n.hasDataDrivenTextSize,n}return e(i,t),i}(l);i.SymbolStyleLayer=h;var y=function(t){function i(i,e,a){var n=t.call(this,i,e,a)||this,r=n.getPaintProperty("circle-radius");n.hasDataDrivenRadius=!!r&&r.isDataDriven;var o=n.getPaintProperty("circle-color");n.hasDataDrivenColor=!!o&&o.isDataDriven;var l=n.getPaintProperty("circle-opacity");n.hasDataDrivenOpacity=!!l&&l.isDataDriven;var s=n.getPaintProperty("circle-stroke-width");n.hasDataDrivenStrokeWidth=!!s&&s.isDataDriven;var u=n.getPaintProperty("circle-stroke-color");n.hasDataDrivenStrokeColor=!!u&&u.isDataDriven;var D=n.getPaintProperty("circle-stroke-opacity");n.hasDataDrivenStrokeOpacity=!!D&&D.isDataDriven;var h=n.getPaintProperty("circle-blur");return n.hasDataDrivenBlur=!!h&&h.isDataDriven,n}return e(i,t),i}(l);i.CircleStyleLayer=y;var c=function(){function t(t,i,e){this.cap=t.getLayoutValue("line-cap",i,e),this.join=t.getLayoutValue("line-join",i,e),this.miterLimit=t.getLayoutValue("line-miter-limit",i,e),this.roundLimit=t.getLayoutValue("line-round-limit",i,e)}return t}();i.LineLayout=c;var p=function(){function t(t,i,e,a){this.allowOverlap=t.getLayoutValue("icon-allow-overlap",i,a),this.ignorePlacement=t.getLayoutValue("icon-ignore-placement",i,a),this.optional=t.getLayoutValue("icon-optional",i,a),this.rotationAlignment=t.getLayoutValue("icon-rotation-alignment",i,a),this.size=t.getLayoutValue("icon-size",i,a),this.rotate=t.getLayoutValue("icon-rotate",i,a),this.padding=t.getLayoutValue("icon-padding",i,a),this.keepUpright=t.getLayoutValue("icon-keep-upright",i,a),this.offset=t.getLayoutValue("icon-offset",i,a),2===this.rotationAlignment&&(this.rotationAlignment=e?0:1)}return t}();i.IconLayout=p;var v=function(){function t(t,i,e,a){this.allowOverlap=t.getLayoutValue("text-allow-overlap",i,a),this.ignorePlacement=t.getLayoutValue("text-ignore-placement",i,a),this.optional=t.getLayoutValue("text-optional",i,a),this.rotationAlignment=t.getLayoutValue("text-rotation-alignment",i,a),this.fontArray=t.getLayoutValue("text-font",i,a),this.maxWidth=t.getLayoutValue("text-max-width",i,a),this.lineHeight=t.getLayoutValue("text-line-height",i,a),this.letterSpacing=t.getLayoutValue("text-letter-spacing",i,a),this.justify=t.getLayoutValue("text-justify",i,a),this.anchor=t.getLayoutValue("text-anchor",i,a),this.maxAngle=t.getLayoutValue("text-max-angle",i,a),this.size=t.getLayoutValue("text-size",i,a),this.rotate=t.getLayoutValue("text-rotate",i,a),this.padding=t.getLayoutValue("text-padding",i,a),this.keepUpright=t.getLayoutValue("text-keep-upright",i,a),this.transform=t.getLayoutValue("text-transform",i,a),this.offset=t.getLayoutValue("text-offset",i,a),2===this.rotationAlignment&&(this.rotationAlignment=e?0:1)}return t}();i.TextLayout=v});