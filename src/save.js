/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
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
		fullSize,
		hoverText,
	} = attributes;

	let iconContent = (
		<span
			class={`material-${iconSet}${iconSet=="symbols"?"-"+symStyle:icnStyle=="filled"?"":"-"+icnStyle}`}
			style={{ 
				fontSize: `${fullSize?size:size*0.7071}px`,
				fontVariationSettings: `"FILL" ${symFILL?1:0}, "wght" ${symwght}, "GRAD" ${symGRAD}, "opsz" ${symopsz}`,
			}}>
			{ iconSlug }
		</span>
	)

	let innerContent = (
		isLink ? (
		<a 
			href={ link.url } 
			title={ hoverText }
			target={ link.openInNewTab ? "_blank" : "_self" } 
			rel={ link.openInNewTab ? "noopener noreferrer" : "noopener" }
			class={`ws-hover-opacity-${hoverOpacity}`}
		>
			{ iconContent }
		</a>
		) : (
			iconContent
		) 
	)

	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps } style={{ height: `${size}px`, width: `${size}px`, borderRadius: `${radius*size/200}px` }} >
			{ innerContent }
		</div>
	);
}
