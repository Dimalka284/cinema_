$file = "backend/main.py"
if (Test-Path $file) {
    $content = Get-Content $file -Raw
    $fixed = $content -replace 'api_key="AQ\.Ab8RN6J929xDK5U_4mp3XzmZULugI0ADLcX1plaabqQPdwTzgg"', 'api_key=os.getenv("GEMINI_API_KEY")'
    Set-Content $file $fixed -NoNewline
}
