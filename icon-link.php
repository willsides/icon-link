<?php
/**
 * Plugin Name:       Icon Link
 * Plugin URI:        https://github.com/willsides/icon-link
 * Description:       Displays an icon as a link
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.1
 * Author:            Will Sides
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       icon-link
 *
 * @package           willsides
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function willsides_icon_link_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'willsides_icon_link_block_init' );

function willsides_icon_link_enqueue_styles() {
    wp_enqueue_style( 'material_symbols_sharp', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200', array(), null );
    wp_enqueue_style( 'material_symbols_outlined', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200', array(), null );
    wp_enqueue_style( 'material_symbols_rounded', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200', array(), null );
    wp_enqueue_style( 'material_icons', 'https://fonts.googleapis.com/icon?family=Material+Icons', array(), null );
    wp_enqueue_style( 'material_icons-outlined', 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined', array(), null );
    wp_enqueue_style( 'material_icons-two-tone', 'https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone', array(), null );
    wp_enqueue_style( 'material_icons-round', 'https://fonts.googleapis.com/icon?family=Material+Icons+Round', array(), null );
    wp_enqueue_style( 'material_icons-sharp', 'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp', array(), null );
}
add_action( 'wp_enqueue_scripts', 'willsides_icon_link_enqueue_styles' );
if ( is_admin() ) {
    add_action( 'enqueue_block_editor_assets', 'willsides_icon_link_enqueue_styles' );
}