import "App.sass";
import "./CategoryPath.sass";

function CategoryPath(props) {
  let path = "";
  if (props.categories) {
    path = props.categories.join(" > ");
  }

  return (
    <>
      <div className="category-path m-sm">{path}</div>
    </>
  );
}

export default CategoryPath;
