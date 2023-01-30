let sUserAgent,
    isOpera,
    isIE,
    _body,
    initialClientHeight,
    isIOS;

document.addEventListener('DOMContentLoaded', function() {
    sUserAgent = navigator.userAgent;
    isOpera = sUserAgent.indexOf("Opera") > -1;
    isIE = sUserAgent.indexOf("compatible") > -1 
            && sUserAgent.indexOf("MSIE") > -1
            && !isOpera;
    _body = document.querySelector('body');
    initialClientHeight = window.innerHeight;

    localStorage.setItem('initialClientHeight', initialClientHeight);

    // resize
    window.addEventListener('resize', () => {
        // default
        setScreenSize();
        // 키보드가 닫힌 상태 체크(AOS)
        !isIOS ? handleResize() : '';

    });

    const init = () => {
        // default
        checkOS();
        setScreenSize();
        // !isIOS ? handleResize() : '';
        fnRipple();
        // form
        inputClearBtnShow();
        inputClear();
        inputShowPassword();
        checkAllClick();
        checkesClick();
        fixedToStaticBtnArea();
        stopEnter();
        // layer
        openLayer();
        closeLayer();
        tabClick();
        toggleAccordion();
    };

    init();
    
});


// ripple
function fnRipple() {
    [].map.call(document.querySelectorAll('.btn, .f-btn label, .f-image .btn-add, .doctor-list .item, .inquiry-list .item, .terms-list a, .alert-list .item, .layer-add-image .pick-method .one, .c-accordion .acc-header, .one-click a, .p-setting .locale, .locale-list .f-radio'), el => {
        el.addEventListener('click',e => {
            e = e.touches ? e.touches[0] : e;
            const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width,2)+Math.pow(r.height,2)) * 2;
            el.style.cssText = `--s: 0; --o: 1;`;  el.offsetTop;
            el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`;

            setTimeout( () => {
                el.removeAttribute('style');
            }, 600);
        })
    })
};

// vh
function setScreenSize() {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// input clear
function inputClear() {
    let _clearBtns = document.querySelectorAll('.e-input-clear');

    if(_clearBtns !== null) {
        [].map.call( _clearBtns, button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();

                const _target = event.target;
                const _targetInput = (_target.parentElement).querySelector('input');

                _targetInput.value = '';

                // 가족등록 페이지 유효성 검사를 위해 필요/등록버튼 활성화를 위해 필요
                if(typeof allCheck == 'function'){
                    allCheck();
                }
            });
        } );
    }
};

// input clear button show
function inputClearBtnShow() {
    const _clearBtns = document.querySelectorAll('.e-input-clear');
    const _inputs = document.querySelectorAll('.f-control input');
    let _target, _targetParent, hasValue, inputValue;

    if(_clearBtns !== null) {
        [].map.call( _inputs, item => {
            item.addEventListener('focus', (event) => {
                _target = event.target;
                _targetParent = _target.parentElement;
                inputValue = _target.value;

                inputValue !== '' ? hasValue = true : hasValue = false;

                if(hasValue) {
                    _targetParent.classList.add('on');
                } else {
                    setTimeout(() => {
                        _targetParent.classList.remove('on');
                    }, 750);
                }

                item.addEventListener('keyup', (event) => {
                    _target = event.target;
                    _targetParent = _target.parentElement;
                    inputValue = _target.value;
    
                    inputValue !== '' ? hasValue = true : hasValue = false;
    
                    if(hasValue) {
                        _targetParent.classList.add('on');
                        return;
                    }
                    if(!hasValue) {
                        setTimeout(() => {
                            _targetParent.classList.remove('on');
                        }, 750);
                        return;
                    }
                });
            });
            item.addEventListener('focusout', (event) => {
                _target = event.target;
                _targetParent = _target.parentElement;

                setTimeout(() => {
                    _targetParent.classList.remove('on');
                }, 750);
            });
        });
    }
};

// input show password
function inputShowPassword() {
    let _toSeeBtns = document.querySelectorAll('.e-input-eye');
    let _target, _targetInput, type, newType;

    if(_toSeeBtns !== null) {
        [].map.call( _toSeeBtns, button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();

                _target = event.target;
                _targetInput = (_target.parentElement).querySelector('input');
                type = _targetInput.getAttribute('type');

                type === 'password' ? newType = 'text' : newType = 'password';

                newType === 'text' ? _target.classList.add('on') : _target.classList.remove('on');

                _targetInput.setAttribute('type', newType);
            });
        } );
    }
};

// all check
function checkAllClick() {
    const _allChk = document.querySelector('.f-chk.all input');
    let _target, _thisParent, _checkboxes;

    if(_allChk !== null) {
        _allChk.addEventListener('click', (event) => {
            _target = event.target;
            _thisParent = _target.closest('.e-check_range');
            _checkboxes = _thisParent.querySelectorAll('.f-chk:not(.all) input');

            [].map.call( _checkboxes, checkbox => {
                checkbox.checked = _allChk.checked;
            });
        });
    }
};

function checkesClick() {
    const _checkboxes = document.querySelectorAll('.e-check_range .f-chk:not(.all) input');
    let _target, _thisParent, _allChk, _checked, _rangeCheckboxes;

    if(_checkboxes !== null) {
        [].map.call( _checkboxes, checkbox => {
            checkbox.addEventListener('click', (event) => {
                _target = event.target;
                _thisParent = _target.closest('.e-check_range');
                _allChk = _thisParent.querySelector('.f-chk.all input');
                _rangeCheckboxes = _thisParent.querySelectorAll('.f-chk:not(.all) input');
                _checked = _thisParent.querySelectorAll('.f-chk:not(.all) input:checked');

                if( _rangeCheckboxes.length === _checked.length ) {
                    _allChk.checked = true;
                } else {
                    _allChk.checked = false;
                }
            });
        });
    }
};

// 키보드 열릴 시 고정 버튼 내리기
function fixedToStaticBtnArea() {
    const _inputs = document.querySelectorAll('.f-group input:not(readonly)');

    if(_inputs !== null && !isIOS) {
        _inputs.forEach( input => {
            input.addEventListener('focus', (event) => {
                handleResize();
            }, true);
            input.addEventListener('blur', (event) => {
                handleResize();
            }, true);
        } );
    }
}
// 키보드가 닫힌 상태 체크(AOS)
function handleResize() {
    if(window.visualViewport.height < initialClientHeight) {
        _body.classList.add('is-focused');
    } else {
        _body.classList.remove('is-focused');
    }
};

function checkOS() {
    var agent = window.navigator.userAgent;
    if( agent.indexOf( 'iPhone' ) > -1 || agent.indexOf( 'iPad' ) > -1 ){
        // console.log('iOS');
        return isIOS = true;
    }
    // console.log('not iOS');
    return isIOS = false;
}

// input 키보드 엔터(submit) 막기
function stopEnter() {
    const _inputs = document.querySelectorAll('.f-group input:not(readonly)');

    if(_inputs !== null) {
        [].map.call( _inputs, el => {
            el.addEventListener('keydown', (event) => {
                if(event.keyCode == 13) {
                    event.preventDefault();
                }
            });
        } );
    }
}

// layer
function openLayer() {
    const _openBtns = document.querySelectorAll('.e-layer');
    let _target, _targetLayer;

    if(_openBtns !== null) {
        [].map.call( _openBtns, button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                _target = event.currentTarget;
                _targetLayer = document.querySelector(_target.getAttribute('href'));

                _targetLayer.classList.add('show');
                _body.classList.add('overlay');
            });
        });
    }
};
function closeLayer() {
    const _closeBtns = document.querySelectorAll('.layer .e-close');
    const _closedimmeds = document.querySelectorAll('.layer .dimmed');
    let _target, _targetLayer;

    if(_closeBtns !== null) {
        [].map.call( _closeBtns, button => {
            button.addEventListener('click', (event) => {
                _target = event.target;
                _targetLayer = _target.closest('.layer');

                if( !(_target.classList.contains('e-layer')) ) {
                    _body.classList.remove('overlay');
                }
                _targetLayer.classList.remove('show');
            });
        } );
    }
    if(_closedimmeds !== null) {
        [].map.call( _closedimmeds, dimmed => {
            dimmed.addEventListener('click', (event) => {
                _target = event.target;
                _targetLayer = _target.closest('.layer');
    
                _targetLayer.classList.remove('show');
                _body.classList.remove('overlay');
            });
        });
    }
};


// tab
function tabClick() {
    const siblings = (el) => [...el.parentElement.children].forEach(sib => sib.classList.remove('active'));
    const _tabs = document.querySelectorAll('.e-tab a');
    let _target, _targetContent;

    if(_tabs !== null) {
        [].map.call( _tabs, tab => {
            tab.addEventListener('click', (event) => {
                event.preventDefault();
                _target = event.target;
                _targetContent = document.querySelector(_target.getAttribute('href'));

                siblings(_targetContent);
                
                siblings(_target.parentNode);

                if( _target.closest('.c-tab').classList.contains('fixed') ) {
                    window.scrollTo(0, 0);
                }

                _target.parentNode.classList.add('active');
                _targetContent.classList.add('active');
                
                fnRipple();
            });
        });
    }
};


// 아코디언
function toggleAccordion() {
    const _accToggles = document.querySelectorAll('.c-accordion .e-toggle');
    let _target, _targetContents, _list;

    if(_accToggles !== null) {
        [].map.call( _accToggles, toggle => {
            toggle.addEventListener('click', (event) => {
                event.preventDefault();
                _target = event.currentTarget;
                _targetContents = _target.closest('.one');
                _list = _targetContents.closest('.c-accordion').querySelectorAll('.one');

                if(_targetContents.classList.contains('active')) {
                    _targetContents.classList.remove('active');
                } else {
                    _list.forEach(item => {
                        item.classList.remove('active');
                    });
                    _targetContents.classList.add('active');
                }
            });
        } );
    }
}