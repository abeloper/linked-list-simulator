class LinkedList {
            constructor() {
                this.head = null;
                this.memoryAddress = 0x1000;
                this.highlightedNode = null;
            }

            createNode(value) {
                const address = this.memoryAddress.toString(16).toUpperCase();
                this.memoryAddress += 8; // 4 bytes value + 4 bytes pointer
                return {
                    value: value,
                    next: null,
                    address: `0x${address.padStart(8, '0')}`,
                    element: null
                };
            }

            insertAtBeginning(value) {
                this.updateCode(`
<span class="comment">; Insert at Beginning</span>
<span class="instruction">mov</span> <span class="register">eax</span>, [<span class="memory">input_value</span>]  <span class="comment">; Load value to insert</span>
<span class="instruction">call</span> <span class="memory">allocate_node</span>        <span class="comment">; Allocate memory</span>
<span class="instruction">mov</span> [<span class="register">eax</span>], <span class="register">ebx</span>          <span class="comment">; Store value in node</span>
<span class="instruction">mov</span> <span class="register">ebx</span>, [<span class="memory">head_ptr</span>]     <span class="comment">; Get current head</span>
<span class="instruction">mov</span> [<span class="register">eax</span>+4], <span class="register">ebx</span>       <span class="comment">; Set next pointer</span>
<span class="instruction">mov</span> [<span class="memory">head_ptr</span>], <span class="register">eax</span>   <span class="comment">; Update head pointer</span>`);

                const newNode = this.createNode(value);
                newNode.next = this.head;
                this.head = newNode;
                this.highlightedNode = newNode;
                return newNode;
            }

            insertAtEnd(value) {
                this.updateCode(`
<span class="comment">; Insert at End</span>
<span class="instruction">mov</span> <span class="register">eax</span>, [<span class="memory">input_value</span>]  <span class="comment">; Load value</span>
<span class="instruction">call</span> <span class="memory">allocate_node</span>        <span class="comment">; Allocate memory</span>
<span class="instruction">mov</span> [<span class="register">eax</span>], <span class="register">ebx</span>          <span class="comment">; Store value</span>
<span class="instruction">mov</span> <span class="register">dword</span> [<span class="register">eax</span>+4], 0    <span class="comment">; Next = NULL</span>
<span class="instruction">mov</span> <span class="register">ecx</span>, [<span class="memory">head_ptr</span>]     <span class="comment">; Start traversal</span>
<span class="instruction">test</span> <span class="register">ecx</span>, <span class="register">ecx</span>           <span class="comment">; Check if empty</span>
<span class="instruction">jz</span> <span class="memory">.make_head</span>          <span class="comment">; If empty, make head</span>`);

                const newNode = this.createNode(value);
                this.highlightedNode = newNode;

                if (!this.head) {
                    this.head = newNode;
                    return newNode;
                }

                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = newNode;
                return newNode;
            }

            deleteNode(value) {
                this.updateCode(`
<span class="comment">; Delete Node by Value</span>
<span class="instruction">mov</span> <span class="register">eax</span>, [<span class="memory">head_ptr</span>]     <span class="comment">; Load head</span>
<span class="instruction">test</span> <span class="register">eax</span>, <span class="register">eax</span>           <span class="comment">; Check if empty</span>
<span class="instruction">jz</span> <span class="memory">.empty_list</span>         <span class="comment">; Jump if empty</span>
<span class="instruction">mov</span> <span class="register">ebx</span>, [<span class="memory">input_value</span>]  <span class="comment">; Load target value</span>
<span class="instruction">cmp</span> [<span class="register">eax</span>], <span class="register">ebx</span>         <span class="comment">; Compare with head</span>
<span class="instruction">jne</span> <span class="memory">.search_list</span>        <span class="comment">; If not head, search</span>`);

                if (!this.head) return false;

                // If head needs to be deleted
                if (this.head.value === value) {
                    this.head = this.head.next;
                    this.highlightedNode = null;
                    return true;
                }

                let current = this.head;
                while (current.next && current.next.value !== value) {
                    current = current.next;
                }

                if (current.next) {
                    current.next = current.next.next;
                    this.highlightedNode = null;
                    return true;
                }

                return false;
            }

            traverse() {
                this.updateCode(`
<span class="comment">; List Traversal</span>
<span class="instruction">mov</span> <span class="register">eax</span>, [<span class="memory">head_ptr</span>]     <span class="comment">; Start from head</span>
<span class="instruction">test</span> <span class="register">eax</span>, <span class="register">eax</span>           <span class="comment">; Check if empty</span>
<span class="instruction">jz</span> <span class="memory">.empty</span>              <span class="comment">; Jump if empty</span>
<span class="memory">.traverse:</span>
<span class="instruction">mov</span> <span class="register">ebx</span>, [<span class="register">eax</span>]        <span class="comment">; Get node value</span>
<span class="instruction">mov</span> <span class="register">eax</span>, [<span class="register">eax</span>+4]      <span class="comment">; Move to next node</span>
<span class="instruction">test</span> <span class="register">eax</span>, <span class="register">eax</span>           <span class="comment">; Check if NULL</span>
<span class="instruction">jnz</span> <span class="memory">.traverse</span>          <span class="comment">; Continue if not NULL</span>`);

                const values = [];
                let current = this.head;
                while (current) {
                    values.push(current.value);
                    current = current.next;
                }
                return values;
            }

            updateCode(code) {
                document.getElementById('currentCode').innerHTML = code;
            }

            updateRegisters() {
                document.getElementById('regEAX').textContent = this.head ? this.head.address : '0x00000000';
                document.getElementById('regEBX').textContent = '0x' + (this.memoryAddress - 8).toString(16).toUpperCase().padStart(8, '0');
            }
        }

        const linkedList = new LinkedList();

        function updateVisualization() {
            const visualization = document.getElementById('listVisualization');
            visualization.innerHTML = '';

            if (!linkedList.head) {
                visualization.innerHTML = '<div class="null-pointer">List is empty [head_ptr → NULL]</div>';
                return;
            }

            let current = linkedList.head;
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.flexWrap = 'wrap';

            // Add head pointer
            const headPointer = document.createElement('div');
            headPointer.className = 'node-address';
            headPointer.innerHTML = `head_ptr → `;
            container.appendChild(headPointer);

            while (current) {
                const nodeDiv = document.createElement('div');
                nodeDiv.className = 'node';
                
                const nodeBox = document.createElement('div');
                nodeBox.className = 'node-box';
                if (current === linkedList.highlightedNode) {
                    nodeBox.classList.add('highlight');
                }

                nodeBox.innerHTML = `
                    <div class="node-value">${current.value}</div>
                    <div class="node-address">${current.address}</div>
                `;

                nodeDiv.appendChild(nodeBox);
                container.appendChild(nodeDiv);

                if (current.next) {
                    const arrow = document.createElement('div');
                    arrow.className = 'arrow';
                    arrow.textContent = '→';
                    container.appendChild(arrow);
                } else {
                    const nullPtr = document.createElement('div');
                    nullPtr.className = 'null-pointer';
                    nullPtr.textContent = '→ NULL';
                    container.appendChild(nullPtr);
                }

                current = current.next;
            }

            visualization.appendChild(container);
            updateMemoryView();
            linkedList.updateRegisters();
        }

        function updateMemoryView() {
            const memoryDisplay = document.getElementById('memoryDisplay');
            let memoryHTML = `head_ptr: ${linkedList.head ? linkedList.head.address : '0x00000000 (NULL)'}<br>`;

            let current = linkedList.head;
            let address = 0x1000;
            
            while (current) {
                memoryHTML += `
                    <span class="memory-address">${current.address}:</span> 
                    <span class="memory-value">${current.value}</span> | 
                    <span class="memory-address">${(parseInt(current.address, 16) + 4).toString(16).toUpperCase().padStart(8, '0')}:</span>
                    <span class="memory-value">${current.next ? current.next.address : 'NULL'}</span><br>`;
                current = current.next;
            }

            memoryDisplay.innerHTML = memoryHTML;
        }

        function updateStatus(message) {
            document.getElementById('status').textContent = message;
        }

        function insertAtBeginning() {
            const value = parseInt(document.getElementById('insertValue').value);
            if (isNaN(value)) {
                updateStatus('Error: Please enter a valid number');
                return;
            }

            linkedList.insertAtBeginning(value);
            updateVisualization();
            updateStatus(`Inserted value ${value} at beginning of list`);
            document.getElementById('insertValue').value = '';
        }

        function insertAtEnd() {
            const value = parseInt(document.getElementById('insertValue').value);
            if (isNaN(value)) {
                updateStatus('Error: Please enter a valid number');
                return;
            }

            linkedList.insertAtEnd(value);
            updateVisualization();
            updateStatus(`Inserted value ${value} at end of list`);
            document.getElementById('insertValue').value = '';
        }

        function deleteNode() {
            const value = parseInt(document.getElementById('deleteValue').value);
            if (isNaN(value)) {
                updateStatus('Error: Please enter a valid number');
                return;
            }

            const success = linkedList.deleteNode(value);
            updateVisualization();
            updateStatus(success ? 
                `Deleted node with value ${value}` : 
                `Value ${value} not found in list`);
            document.getElementById('deleteValue').value = '';
        }

        function displayList() {
            const values = linkedList.traverse();
            updateVisualization();
            updateStatus(values.length > 0 ? 
                `List traversal: ${values.join(' → ')}` : 
                'List is empty');
        }

        function clearList() {
            linkedList.head = null;
            linkedList.memoryAddress = 0x1000;
            updateVisualization();
            updateStatus('List cleared');
            linkedList.updateCode('; List cleared - ready for new operations');
        }

        function generateRandomList() {
            clearList();
            const values = [10, 20, 30, 40, 50];
            values.forEach(value => linkedList.insertAtEnd(value));
            updateVisualization();
            updateStatus('Generated random list with values: ' + values.join(', '));
        }

        // Initialize
        updateVisualization();