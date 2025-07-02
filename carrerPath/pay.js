document.getElementById('paymentForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const phoneNumber = document.getElementById('number').value;
    const amount = document.getElementById('amount').value;
    const downBtn =  document.getElementById('downloadBtn')

    const options = {
        method: 'POST',
        headers: {
            'X-API-Key': '-nYXMURqDlxEgU59KvJIl',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: Number(amount),
            phoneNumber: phoneNumber
        })
    };

    try {
        const response = await fetch("https://api.pay.mynkwa.com/collect", options);
        const data = await response.json();
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);

   
        
        if (response.ok) {
            document.getElementById('result').textContent = 'Payment successful!';

            // Call the downloadPDF function in the parent window
            if (window.parent && typeof window.parent.downloadPDF === 'function') {
                try {
                    window.parent.downloadPDF();
                } catch (error) {
                    document.getElementById('result').textContent = 'Error: Could not execute downloadPDF: ' + error;
                }
            } else {
                document.getElementById('result').textContent = 'Error: downloadPDF function not found in parent window.';
            }
        } else {
            document.getElementById('result').textContent = 'Payment failed.';
        }
            

    } catch (error) {
        document.getElementById('result').textContent = 'Error: ' + error;
    }
});