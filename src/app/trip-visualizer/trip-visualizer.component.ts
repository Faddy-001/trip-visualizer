// trip-visualizer.component.ts
import { Component, signal } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-trip-visualizer',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './trip-visualizer.component.html',
  styleUrls: ['./trip-visualizer.component.scss']
})
export class TripVisualizerComponent {
  startPoint = signal('');
  endPoint = signal('');
  trips = signal<{ from: string; to: string }[]>([]);

  addTrip() {
    const from = this.startPoint().trim().toUpperCase();
    const to = this.endPoint().trim().toUpperCase();
    if (from && to) {
      this.trips.update((t) => [...t, { from, to }]);
      this.startPoint.set('');
      this.endPoint.set('');
    }
  }

  getLevel(trip: { from: string; to: string }, index: number): string {
    const allTrips = this.trips();
    const prevTrip = allTrips[index - 1];
    const isSame = prevTrip && trip.from === prevTrip.from && trip.to === prevTrip.to;
    const isContinued = prevTrip && trip.from === prevTrip.to;
    if (isSame) return 'level-2';
    if (!isContinued && prevTrip) return 'level-1-arrow';
    return 'level-1';
  }
}