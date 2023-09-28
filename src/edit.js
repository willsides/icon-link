/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	useBlockProps, 
	__experimentalLinkControl as LinkControl,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';

import { 
	RangeControl,
	ToolbarGroup,
	TextControl,
	ToggleControl,
	PanelBody
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, isSelected, setAttributes } ) {
	const { 
		link, 
		size, 
		hoverOpacity,
		iconSlug,
		isLink
	} = attributes;

	function updateLink(newLink) {
		if (!newLink) return;
		let { url, openInNewTab } = newLink;
		setAttributes({ link: { url, openInNewTab } });
	}

	const handleLinkClick = (event) => {
		if (!event.ctrlKey) {
		  event.preventDefault();
		}
	};

	let iconContent = (
		<span
			class="material-symbols-sharp"
			style={{ fontSize: `${size}px` }}>
			{ iconSlug }
		</span>
	)

	let innerContent = (
		isLink ? (
		<a 
			href={ link.url } 
			title={`(Ctrl+Click to follow link)`}
			target={ link.openInNewTab ? "_blank" : "_self" } 
			rel={ link.openInNewTab ? "noopener noreferrer" : "noopener" }
			class={`ws-hover-opacity-${hoverOpacity}`}
			onClick={handleLinkClick}
		>
			{ iconContent }
		</a>
		) : (
			iconContent
		) 
	)

	let toolbarControls = (
		<BlockControls>
			<ToolbarGroup>
				<TextControl
					label="Icon or symbol slug"
					value={ iconSlug }
					onChange={ ( val ) => setAttributes( { iconSlug: val } ) }
				/>
			</ToolbarGroup>
		</BlockControls>
	)

	let sidebarControls = (
		<InspectorControls>
			<PanelBody title="Link Settings" initialOpen={ true }>
				<ToggleControl 
					label="Link"
					checked={isLink}
					onChange={ () => setAttributes({ isLink: !isLink })}
				/>
				{ isLink ? 
				<LinkControl
					searchInputPlaceholder="Enter link URL..."
					value={ link || "" } 
					onChange={ ( newLink ) => {
						updateLink(newLink); 
					} }
					showInitialSuggestions={false}
				/> :
				"" }
			</PanelBody>
			<PanelBody title="Display Settings">
				<RangeControl
					label="Size"
					value={size}
					onChange={(value) => setAttributes({ size: value })}
					min={25}
					max={200}
					allowReset={true}
					resetFallbackValue={100}
				/>
				<RangeControl
					label="Hover Opacity %"
					value={hoverOpacity}
					onChange={(value) => setAttributes({ hoverOpacity: value })}
					min={0}
					max={100}
					step={10}
					allowReset={true}
					resetFallbackValue={70}
				/>
			</PanelBody>
		</InspectorControls>
	)

	return (
		<div { ...useBlockProps() } style={{ height: `${size}px`, width: `${size}px` }} >
			{ toolbarControls }
			{ sidebarControls }
			{ innerContent }
		</div>
	);
}
