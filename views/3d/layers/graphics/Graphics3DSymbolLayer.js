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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../Color","../../../../core/Logger","../../../../core/scheduling","../../../../layers/graphics/dehydratedFeatures","./constants","./ElevationContext","./featureExpressionInfoUtils","./Graphics3DSymbolCommonCode","./graphicUtils","../../support/mathUtils","../../support/PromiseLightweight"],function(t,e,r,o,n,i,a,s,l,p,u,c,y,f){function h(t,e){var r=null!=t?e.attributes[t]:0;return null!=r&&isFinite(r)?r:0}var d=new l,_=n.getLogger("esri.views.3d.layers.graphics.Graphics3DSymbolLayer"),v={mode:"on-the-ground",offset:0,unit:"meters"},g={mode:"absolute-height",offset:0,unit:"meters"};return function(t){function e(e,r,o,n){var i=t.call(this)||this;return i._elevationOptions={supportsOffsetAdjustment:!1,supportsOnTheGround:!0},i.symbolContainer=e,i.symbol=r,i._context=o,i._symbolLayerOrder=o.layerOrder,i._symbolLayerOrderDelta=o.layerOrderDelta,i._elevationContext=new l,i._material=null,i._geometryCreationWarningHandle=null,i._updateDrivenProperties(n),i._updateElevationContext(),i._prepareResources(),i}return r(e,t),e.prototype._logWarning=function(t){_.warn(t)},e.prototype._logGeometryCreationWarnings=function(t,e,r,o){var n=this;if(null==this._geometryCreationWarningHandle){var a=t.projectionSuccess,s=t.geometryData&&t.geometryData.polygons,l=o+" geometry failed to be created",p=null;a?!e.length||1===e.length&&!e[0].length?p=l+" (no "+r+" were defined)":Array.isArray(e)&&Array.isArray(e[0])?e.some(function(t){return 1===t.length})?p=l+" ("+r+" should contain at least 2 vertices)":s&&0===s.length&&"rings"===r&&(p=l+" (filled "+r+" should use clockwise winding - try reversing the order of vertices)"):p=l+" ("+r+" should be defined as a 2D array)":p=l+" (failed to project geometry to view spatial reference)",p&&(this._geometryCreationWarningHandle=i.schedule(function(){return n._onNextTick()}),this._logWarning(p))}},e.prototype._onNextTick=function(){this._geometryCreationWarningHandle=null},e.prototype._validateGeometry=function(t){if("point"===t.type){var e=t;if(!y.isFinite(e.x)||!y.isFinite(e.y))return this._logWarning("point coordinate is not a valid number, graphic skipped"),!1}return!0},e.prototype._prepareResources=function(t){throw new Error("This is an abstract base class")},e.prototype._defaultElevationInfoNoZ=function(){return v},e.prototype._defaultElevationInfoZ=function(){return g},e.prototype._updateElevationContext=function(){this._elevationContext.setDefaults();var t=this._context.layer.elevationInfo;t&&this._elevationContext.mixinApi(t);var e=this.symbol&&this.symbol.elevationInfo;e&&this._elevationContext.mixinApi(e),this._elevationContext.featureExpressionInfoContext=this._context.featureExpressionInfoContext},e.prototype.getGraphicElevationContext=function(t){var e=a.hasZ(t.geometry)?this._defaultElevationInfoZ():this._defaultElevationInfoNoZ();d.setUnit(null!=this._elevationContext.unit?this._elevationContext.unit:e.unit),d.mode=this._elevationContext.mode||e.mode,d.setOffsetMeters(null!=this._elevationContext.meterUnitOffset?this._elevationContext.meterUnitOffset:e.offset),d.featureExpressionInfoContext=this._elevationContext.featureExpressionInfoContext,d.hasOffsetAdjustment=!1,this._elevationOptions.supportsOnTheGround||"on-the-ground"!==d.mode||(d.mode="relative-to-ground",d.setOffsetMeters(0),d.featureExpressionInfoContext=p.zeroContext);var r=p.createFeature(t,this._context.layer);return p.setContextFeature(d.featureExpressionInfoContext,r),u.needsOffsetAdjustment(d,this._elevationOptions,t.geometry,this.symbolContainer)&&(d.setOffsetRenderUnits(s.defaultIconElevationOffset),d.hasOffsetAdjustment=!0),d},e.prototype._getDrapedZ=function(){return-2},e.prototype._updateDrivenProperties=function(t){var e={color:!1,opacity:!1,size:!1};if(!t){var r=this._context.renderer;r&&(e.color=!!r.colorInfo,e.size=!!r.sizeInfo,r.visualVariables&&r.visualVariables.forEach(function(t){switch(t.type){case"color":if(e.color=!0,t.colors)for(var r=0;r<t.colors.length;r++){var o=t.colors[r];o&&(Array.isArray(o)&&o.length>3&&255!==o[3]||void 0!==o.a&&255!==o.a)&&(e.opacity=!0)}if(t.stops)for(var r=0;r<t.stops.length;r++){var o=t.stops[r].color;o&&(Array.isArray(o)&&o.length>3&&255!==o[3]||void 0!==o.a&&255!==o.a)&&(e.opacity=!0)}break;case"opacity":e.opacity=!0;break;case"size":e.size=!0}}))}this._drivenProperties=e},e.prototype._isPropertyDriven=function(t){return this._drivenProperties[t]},e.prototype._getLayerOpacity=function(){if(this._context.layerView&&"fullOpacity"in this._context.layerView)return this._context.layerView.fullOpacity;var t=this._context.layer.opacity;return null==t?1:t},e.prototype._getMaterialOpacity=function(){var t=1;t*=this._getLayerOpacity();var e=this.symbol&&this.symbol.material;return e&&!this._isPropertyDriven("opacity")&&e.color&&(t*=e.color.a),t},e.prototype._getMaterialOpacityAndColor=function(){var t=this.symbol&&this.symbol.material,e=this._getMaterialOpacity(),r=!this._isPropertyDriven("color")&&t&&t.color?o.toUnitRGB(t.color):null;return c.mixinColorAndOpacity(r,e)},e.prototype._getVertexOpacityAndColor=function(t,e,r){var o=this._isPropertyDriven("color")?t.color:null,n=this._isPropertyDriven("opacity")?t.opacity:null,i=c.mixinColorAndOpacity(o,n);return r&&(i[0]*=r,i[1]*=r,i[2]*=r,i[3]*=r),e?new e(i):i},e.prototype._getStageIdHint=function(){return this._context.layer.id+"_symbol"},e.prototype.isFastUpdatesEnabled=function(){return this._fastUpdates&&this._fastUpdates.enabled},e.prototype.updateSymbolLayerOrder=function(t,e){this._symbolLayerOrder=t,this._symbolLayerOrderDelta=e},e.prototype.setDrawOrder=function(t,e,r){this.updateSymbolLayerOrder(t,e),this._material&&(this._material.renderPriority=t,r.add(this._material.id))},e.prototype.createGraphics3DGraphic=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];throw new Error("This is an abstract base class")},e.prototype.destroy=function(){this._geometryCreationWarningHandle&&(this._geometryCreationWarningHandle.remove(),this._geometryCreationWarningHandle=null)},e.prototype.layerPropertyChanged=function(t,e,r){return!1},e.prototype.applyRendererDiff=function(t,e,r,o){return!1},e.prototype.getFastUpdateAttrValues=function(t){if(!this._fastUpdates.enabled)return null;var e=this._fastUpdates.visualVariables;return[e.size?h(e.size.field,t):0,e.color?h(e.color.field,t):0,0,0]},e}(f.Promise)});