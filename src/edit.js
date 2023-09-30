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
	SelectControl,
	PanelBody,
	Tooltip
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
export default function Edit( { attributes, setAttributes } ) {
	const { 
		link, 
		size,
		radius, 
		hoverOpacity,
		iconSlug,
		isLink,
		iconSet,
		symFILL,
		symwght,
		symGRAD,
		symopsz,
		symStyle,
		icnStyle,
		fullSize
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
			class={`material-${iconSet}${iconSet=="symbols"?"-"+symStyle:icnStyle=="filled"?"":"-"+icnStyle}`}
			style={{ 
				fontSize: `${fullSize?size:size*0.7071}px`,
				fontVariationSettings: `'FILL' ${symFILL?1:0}, 'wght' ${symwght}, 'GRAD' ${symGRAD}, 'opsz' ${symopsz}`,
			}}>
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
			<PanelBody title="Icon Style" initialOpen={ true }>
				<TextControl
					label="Icon or symbol slug"
					value={ iconSlug }
					onChange={ ( val ) => setAttributes( { iconSlug: val } ) }
				/>
				<SelectControl
					value={ iconSet }
					options={ [
						{ label: 'Symbols', value: 'symbols' },
						{ label: 'Icons', value: 'icons' },
					] }
					onChange={(value) => setAttributes({ iconSet: value })}
				/>
				{ (iconSet=="symbols") ?
				(
				<div>
					<SelectControl
						value={ symStyle }
						options={ [
							{ label: 'Sharp', value: 'sharp' },
							{ label: 'Outlined', value: 'outlined' },
							{ label: 'Rounded', value: 'rounded' },
						] }
						onChange={(value) => setAttributes({ symStyle: value })}
					/>
					<ToggleControl 
						label="Fill"
						checked={symFILL}
						onChange={ () => setAttributes({ symFILL: !symFILL })}
					/>
					<RangeControl
						label="Weight"
						value={symwght}
						onChange={(value) => setAttributes({ symwght: value })}
						min={100}
						max={700}
						step={100}
						marks={[
							{value:100, label:'100'},
							{value:200, label:'200'},
							{value:300, label:'300'},
							{value:400, label:'400'},
							{value:500, label:'500'},
							{value:600, label:'600'},
							{value:700, label:'700'},
						]} 
					/>
					<RangeControl
						label="Grade"
						value={symGRAD}
						onChange={(value) => setAttributes({ symGRAD: value })}
						min={-50}
						max={200}
						step={1}
					/>
					<RangeControl
						label="Optical Size"
						value={symopsz}
						onChange={(value) => setAttributes({ symopsz: value })}
						min={20}
						max={48}
						step={1}
					/>
				</div>
				) : (
				<div>
					<SelectControl
						value={ icnStyle }
						options={ [
							{ label: 'Outlined', value: 'outlined' },
							{ label: 'Filled', value: 'filled' },
							{ label: 'Rounded', value: 'round' },
							{ label: 'Sharp', value: 'sharp' },
							{ label: 'Two-Tone', value: 'two-tone' },
						] }
						onChange={(value) => setAttributes({ icnStyle: value })}
				/>
				</div>
				)}
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
					label="Radius Percent"
					value={radius}
					onChange={(value) => setAttributes({ radius: value })}
					min={0}
					max={100}
					allowReset={true}
					resetFallbackValue={0}
				/>
				<Tooltip text="Shrink the icon to guarantee it will fit entirely within a circular background">
					<div>
						<ToggleControl
							label="Full Size Icon"
							checked={fullSize}
							onChange={ () => setAttributes({ fullSize: !fullSize })}
						/>
					</div>
				</Tooltip>
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
		<div { ...useBlockProps() } style={{ height: `${size}px`, width: `${size}px`, borderRadius: `${radius*size/200}px` }} >
			{ toolbarControls }
			{ sidebarControls }
			{ innerContent }
		</div>
	);
}
