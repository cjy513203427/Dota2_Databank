// @override Ext

// This file is order extremely early (typically right after Ext.js) due to the
// above Cmd directive. This ensures that the "modern" and "classic" platform tags
// are properly set up as soon as possible.

Ext.platformTags.classic = !(Ext.platformTags.modern = Ext.isModern = true);

/**
 * An immutable empty array.
 * @property {Array} emptyArray
 * @member Ext
 */
Ext.emptyArray = Object.freeze([]);
