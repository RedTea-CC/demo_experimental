// 判断一个链表是否有环

// 定义链表节点
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// 创建一个示例链表
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // 创建环

/**
 * 快慢指针
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
}

console.log(hasCycle(node1));
