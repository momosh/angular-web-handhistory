import templateUrl from './modal.html';

class ModalController {

    constructor() {}

    $onInit() {
        this.styles = {};
        if (!this.modalId) {
            this.modalId = 'modal-body';
        }

        this.setModalStyles();
    }

    setModalStyles() {
        if (this.modalMaxHeight) {
            this.styles.maxHeight = this.maxHeight;
        }

        if (this.modalMaxWidth) {
            this.styles.maxWidth = this.maxWidth;
        }

        if (this.modalMinHeight) {
            this.styles.minHeight = this.minHeight;
        }

        if (this.modalMinWidth) {
            this.styles.minWidth = this.minWidth;
        }

        if (this.modalWidth) {
            this.styles.width = this.width;
        }
    }

    // Public viewModel methods
    // --------------------------------------------------
    close() {
        this.visible = false;
    }
}

export const ModalComponent = {
    template: templateUrl,
    controller: ModalController,
    bindings: {
        visible: '=',
        maxWidth: '<',
        minWidth: '<',
        maxHeight: '<',
        minHeight: '<',
        width: '<',
        modalId: '<'
    },
    transclude: {
        body: 'modalBody'
    }
};