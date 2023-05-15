type TagItemProps = {
    tagName: String
}

const TagItem = (props: TagItemProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", color: "black", fontStyle: "italic", fontWeight: 700, textAlign: "center" }}>
        <p style={{margin: "0"}}> {props.tagName} </p>
    </div>
  )
}

export default TagItem