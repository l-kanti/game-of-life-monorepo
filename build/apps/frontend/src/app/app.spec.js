"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const app_1 = require("./app");
const nx_welcome_1 = require("./nx-welcome");
describe('App', () => {
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            imports: [app_1.App, nx_welcome_1.NxWelcome],
        }).compileComponents();
    });
    it('should render title', async () => {
        const fixture = testing_1.TestBed.createComponent(app_1.App);
        await fixture.whenStable();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Welcome frontend');
    });
});
//# sourceMappingURL=app.spec.js.map