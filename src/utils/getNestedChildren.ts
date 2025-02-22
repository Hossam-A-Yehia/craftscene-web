interface TreeNode<T> {
  children?: T[];
}

export const getLastNestedChildren = <T extends TreeNode<T>>(
  parent: T
): T[] => {
  if (!parent.children || parent.children.length === 0) {
    return [parent];
  }

  const childrenArray = parent.children;
  let leafNodes: T[] = [];

  childrenArray.forEach((child) => {
    leafNodes = [...leafNodes, ...getLastNestedChildren(child)];
  });

  return leafNodes;
};

export const extractLeafChildren = (parents: any) => {
  if (!parents || parents.length === 0) return [];
  return parents.flatMap((child: any) => getLastNestedChildren(child));
};
