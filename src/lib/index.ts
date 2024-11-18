'use strict';
import "./index.css";

interface config {
  reloadTime?: number;
  minHeight?: number;
  minWidth?: number;
  checkType?: 'both'|'any';
}
class Bfg9000 {
  #config:config = {};
  #weaponReady = true;
  #weaponElement:HTMLDivElement;
  #weaponSound:HTMLAudioElement;

  constructor({reloadTime = 3000, minHeight = 100, minWidth = 100, checkType = 'both'}:config) {
    this.#config.reloadTime = reloadTime;
    this.#config.minHeight = minHeight;
    this.#config.minWidth = minWidth;
    this.#config.checkType = checkType;

    this.#initAudio();
    this.#initWeapon();
  }

  #initAudio = ():void => {
    this.#weaponSound = new Audio('data:audio/ogg;base64,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');
  }

  #initWeapon = (): void => {
    const weaponWrapper = document.createElement('div');
    weaponWrapper.classList.add('bfg9000-wrapper');
    this.#weaponElement = document.createElement('div');
    this.#weaponElement.classList.add('bfg9000');
    weaponWrapper.appendChild(this.#weaponElement);
    document.body.appendChild(weaponWrapper);
    this.#initWeaponFireSystem();
  };

  #initWeaponFireSystem = ():void => {
    document.addEventListener('click', this.#weaponFire);
  };

  #weaponFire = (e:PointerEvent):void => {
    if(this.#weaponReady) {
      this.#weaponElement.parentElement.classList.add('active');
      this.#weaponReady = false;
      setTimeout(() => {
        if(this.#weaponSound.play) {
          const sound = this.#weaponSound.cloneNode(true) as HTMLAudioElement;
          sound.addEventListener('canplay', () => {
            sound.play();
            sound.addEventListener('ended', () => {
              sound.remove();
            });
          });
        }
        const bound = this.#weaponElement.getBoundingClientRect();
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.#sendProjectile(Math.round(bound.x + 80), Math.round(bound.y - 40 + scrollTop), Math.round(e.pageX), Math.round(e.pageY), e.target);
      }, 300);
      setTimeout(() => {
        this.#weaponElement.parentElement.classList.remove('active');
        this.#weaponReady = true;
      }, this.#config.reloadTime);
    }
  };

  #getDestructibleElement = (target:HTMLElement):HTMLElement|false => {
    if(!target) {
      return false;
    }
    if(target.tagName === 'BODY') {
      return false;
    } else {
      if(
          ((target.clientWidth > this.#config.minWidth && target.clientHeight > this.#config.minHeight) && this.#config.checkType === 'both') ||
          ((target.clientWidth > this.#config.minWidth || target.clientHeight > this.#config.minHeight) && this.#config.checkType === 'any')
      ) {
        return target;
      } else {
        return this.#getDestructibleElement(target.parentElement);
      }
    }
  }

  #sendProjectile = (fromX:number, fromY:number, destX:number, destY:number, target:EventTarget):void => {
    const transX = destX- fromX;
    const transY = destY - fromY;
    const max = Math.max(Math.abs(transX), Math.abs(transY));
    const shot = document.createElement('div');
    shot.style.transition = `all ${max/500}s`;
    shot.style.left = fromX + 'px';
    shot.style.top = fromY + 'px';
    shot.classList.add('bfg9000-shot');
    document.body.appendChild(shot);

    setTimeout(() => {
      shot.style.transform = `translate(${transX}px, ${transY}px)`;
      shot.addEventListener('transitionend', () => {
        shot.remove();
        const el = this.#getDestructibleElement(target as HTMLElement);
        if(el) {
          el.classList.add('flicker-out-1');
          el.addEventListener('animationend', () => {
            el.style.display = 'none';
          });
        }
      });
    }, 50);
  }
}
export default Bfg9000;
