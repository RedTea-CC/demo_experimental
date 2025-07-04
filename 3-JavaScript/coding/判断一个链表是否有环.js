// 判断一个链表是否有环 (Detect Cycle in a Linked List)

/**
 * 定义链表节点。
 * 每个节点包含一个值 (val) 和一个指向下一个节点的指针 (next)。
 */
class ListNode {
  /**
   * @param {any} val - 节点的值。
   */
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/**
 * 使用快慢指针（Floyd's Cycle-Finding Algorithm）判断链表是否有环。
 * 快指针每次移动两步，慢指针每次移动一步。如果链表存在环，快指针最终会追上慢指针。
 *
 * 时间复杂度: O(n) - 在最坏情况下，快指针会遍历整个链表两次。
 * 空间复杂度: O(1) - 只使用了常数额外空间。
 *
 * @param {ListNode} head - 链表的头节点。
 * @returns {boolean} 如果链表有环，则返回 true；否则返回 false。
 * @example
 * // 示例 1: 有环链表
 * const node1 = new ListNode(1);
 * const node2 = new ListNode(2);
 * const node3 = new ListNode(3);
 * const node4 = new ListNode(4);
 * node1.next = node2;
 * node2.next = node3;
 * node3.next = node4;
 * node4.next = node2; // 创建环
 * console.log(hasCycle(node1)); // true
 *
 * // 示例 2: 无环链表
 * const nodeA = new ListNode('A');
 * const nodeB = new ListNode('B');
 * nodeA.next = nodeB;
 * console.log(hasCycle(nodeA)); // false
 *
 * // 示例 3: 空链表
 * console.log(hasCycle(null)); // false
 */
function hasCycle(head) {
  // 如果链表为空或只有一个节点，不可能有环
  if (!head || !head.next) {
    return false;
  }

  let slow = head; // 慢指针，每次移动一步
  let fast = head; // 快指针，每次移动两步

  // 循环直到快指针或其下一个节点为空（表示无环），或者快慢指针相遇
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true; // 快慢指针相遇，表示有环
    }
  }
  return false; // 循环结束仍未相遇，表示无环
}
