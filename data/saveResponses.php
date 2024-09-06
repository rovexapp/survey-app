<?php
header('Content-Type: application/json');
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data) {
    $filename = 'responses.json';
    $responses = file_exists($filename) ? json_decode(file_get_contents($filename), true) : ['cybersecurity' => [], 'general' => []];
    $responses[$data['type']][] = $data['response'];
    
    file_put_contents($filename, json_encode($responses));
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}
?>
