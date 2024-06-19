// DOM이 완전히 로드되면 실행되는 함수
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // 'addButton' 클릭 시 addTerm 함수 호출
    document.getElementById('addButton').addEventListener('click', addTerm);

    // 'searchButton' 클릭 시 searchTerm 함수 호출
    document.getElementById('searchButton').addEventListener('click', searchTerm);
    document.getElementById('saveButton').addEventListener('click', editTerm);
    document.getElementById('deleteButton').addEventListener('click', deleteTerm);
    document.getElementById('searchKeywordButton').addEventListener('click', search);
    document.getElementById('displayTermListButton').addEventListener('click', displayTermList);

});

// 사전 객체 초기화
let dictionary = {};

// 용어 추가 함수
function addTerm() 
{
    console.log('addTerm called');
    const term = document.getElementById('addTerm').value;
    const definition = document.getElementById('addDefinition').value;
    const feedback = document.getElementById('addFeedback');

    // 용어와 설명이 모두 입력되지 않았을때
    if(!term || !definition) 
    {
        feedback.textContent = '용어와 설명을 모두 입력하세요.';
        return;
    }

    // 용어가 중복될 때
    if(dictionary[term]) 
    {
        feedback.textContent = '이미 존재하는 용어입니다.';
        return;
    }

    // 용어와 설명이 모두 입력되었을 때
    dictionary[term] = definition;
    feedback.textContent = '용어가 추가되었습니다.';
    document.getElementById('addTerm').value = '';
    document.getElementById('addDefinition').value = '';
}

// 용어를 검색하는 함수
function searchTerm() 
{
    console.log('searchTerm called');
    const term = document.getElementById('searchTerm').value;
    const feedback = document.getElementById('editFeedback');

    // 검색할 용어가 입력되지 않았을 때
    if(!term)
    {
        feedback.textContent = '검색할 용어를 입력하세요.';
        return;
    }

    // 용어가 사전에 존재하지 않을 때
    if(!dictionary[term]) 
    {
        feedback.textContent = '용어를 찾을 수 없습니다.';
        return;
    }

    document.getElementById('editTerm').value = term;
    document.getElementById('editDefinition').value = dictionary[term];
    document.getElementById('editSection').style.display = 'block';
    feedback.textContent = '';
}

// 기존 용어를 수정하는 함수
function editTerm() 
{
    console.log('editTerm called');
    const oldTerm = document.getElementById('searchTerm').value;
    const newTerm = document.getElementById('editTerm').value;
    const newDefinition = document.getElementById('editDefinition').value;
    const feedback = document.getElementById('editFeedback');

    // 새로운 용어와 설명이 입력되지 않았다면
    if(!newTerm || !newDefinition) 
    {
        feedback.textContent = '용어와 설명을 모두 입력하세요.';
        return;
    }

    // 새로운 용어가 기존 용어와 다르고 이미 존재하는지 확인
    if(oldTerm !== newTerm && dictionary[newTerm]) 
    {
        feedback.textContent = '이미 존재하는 용어입니다.';
        return;
    }

    // 용어가 변경된 경우에 기존 용어 삭제
    if(oldTerm !== newTerm) 
    {
        delete dictionary[oldTerm];
    }

    // 사전에 새로운 용어와 설명 업데이트
    dictionary[newTerm] = newDefinition;
    feedback.textContent = '용어가 수정되었습니다.';
    document.getElementById('editSection').style.display = 'none';
    document.getElementById('searchTerm').value = '';
    document.getElementById('editTerm').value = '';
    document.getElementById('editDefinition').value = '';
}

// 용어 삭제 함수
function deleteTerm() 
{
    console.log('deleteTerm called');
    const term = document.getElementById('deleteTerm').value;
    const feedback = document.getElementById('deleteFeedback');

    // 삭제할 용어가 입력되지 않았다면
    if(!term) 
    {
        feedback.textContent = '삭제할 용어를 입력하세요.';
        return;
    }

    // 용어가 사전에 존재하지 않을때
    if(!dictionary[term]) 
    {
        feedback.textContent = '용어를 찾을 수 없습니다.';
        return;
    }

    // 삭제하기 전에 물어봄 '확인' 누르면 삭제됨
    if(confirm('정말로 이 용어를 삭제하시겠습니까?')) 
    {
        delete dictionary[term];
        feedback.textContent = '용어가 삭제되었습니다.';
        document.getElementById('deleteTerm').value = '';
    }
}

// 용어 검색 함수
function search() 
{
    console.log('search called');
    const keyword = document.getElementById('searchKeyword').value;
    const searchResults = document.getElementById('searchResults');

    // 검색할 키워드가 입력되지 않았다면
    if(!keyword) 
    {
        searchResults.innerHTML = '<p>검색할 키워드를 입력하세요.</p>';
        return;
    }

    // 키워드가 포함된 용어를 찾아서 표시함
    const results = Object.keys(dictionary)
        .filter(term => term.includes(keyword))
        .map(term => `<p>${term}: ${dictionary[term]}</p>`)
        .join('');

    // 검색 결과가 없을 때
    searchResults.innerHTML = results || '<p>검색 결과가 없습니다.</p>';
}

// 용어 리스트 표시 함수
function displayTermList() 
{
    const termList = document.getElementById('termList');
    // 용어가 없으면 메시지 출력
    if(Object.keys(dictionary).length === 0) 
    {
        termList.innerHTML = '<p>리스트가 비어 있습니다.</p>';
        return;
    }
    // 용어와 설명을 리스트로 출력
    const listItems = Object.entries(dictionary).map(([term, definition]) => {
        return `<p><strong>${term}:</strong> ${definition}</p>`;
    }).join('');
    termList.innerHTML = listItems;
}

// 나머지 함수들과 이벤트 리스너 등은 그대로 유지됩니다.
